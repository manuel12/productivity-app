const express = require("express")
const router = express.Router()
const db = require("../../database")
const md5 = require("md5")
const jwt = require("jsonwebtoken")
const { getSecretKey } = require("../../utils.js")

// Login user, fail if user credentials do not exists
router.post("/api/login", (req, res, next) => {
  const { email, password } = req.body

  console.log("On loginUser route")
  console.log({ email, password })

  const errors = []
  const selectSQL = "select * from User"
  const params = []

  if (!email) {
    errors.push("No email (string) specified")
  }

  if (!password) {
    errors.push("No password (string) specified")
  }

  if (password?.length < 8) {
    errors.push("Password must be at least 8 characters")
  }

  if (password?.length > 127) {
    errors.push("Password must be less than 128 characters")
  }

  if (errors.length) {
    res.status(400).json({ error: errors.join(", ") + "." })
    return
  }

  const data = {
    email,
    password: md5(req.body.password),
  }

  // Get all users
  db.all(selectSQL, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }

    // Add them to users const
    const users = rows

    // Find user match by username, email & password
    const existingUser = users.find((user) => user.email === data.email)
    if (existingUser) {
      // Generate JWT token
      const token = jwt.sign(
        {
          id: existingUser.id,
          username: existingUser.username,
          email: existingUser.email,
        },
        getSecretKey()
      )

      return res.status(200).json({
        message: "User successfully logged in!",
        data: rows,
        token: token,
      })
    } else {
      return res.status(400).json({
        error: `User ${data.email} does not exists, register a user first!`,
      })
    }
  })
})

module.exports = router
