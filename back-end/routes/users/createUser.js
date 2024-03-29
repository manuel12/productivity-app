const express = require("express")
const router = express.Router()
const db = require("../../database")
const md5 = require("md5")

// Create new user, fail if user credentials already exist
router.post("/api/user/", (req, res, next) => {
  const { username, email, password } = req.body
  const errors = []

  if (!username) {
    errors.push("No username (string) specified")
  }

  if (username?.length < 6) {
    errors.push("Username must be at least 6 characters")
  }

  if (username?.length > 19) {
    errors.push("Username must be shorter than 20 characters")
  }

  if (!email) {
    errors.push("No email (string) specified")
  }

  if (email?.length < 6) {
    errors.push("Email must be at least 6 characters")
  }

  if (email?.length > 254) {
    errors.push("Email must be shorter than 255 characters")
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
    username,
    email,
    password: md5(req.body.password),
  }

  const insertSQL =
    "INSERT INTO User (username, email, password) VALUES (?,?,?)"
  const params = [data.username, data.email, data.password]

  db.run(insertSQL, params, function (err, result) {
    if (err) {
      const errorMsg = `A user with email ${data.email} already exists!`
      res.status(400).json({ error: errorMsg })
      return
    }

    res.status(201).json({
      message: `User ${data.email} successfully registered!`,
      data: data,
      id: this.lastID,
    })
  })
})

module.exports = router
