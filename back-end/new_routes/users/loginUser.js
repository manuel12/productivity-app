const express = require("express")
const router = express.Router()
const md5 = require("md5")
const jwt = require("jsonwebtoken")
const { getSecretKey } = require("../../utils.js")
const User = require("../../models/User") // Import your Sequelize User model

router.post("/api/login", async (req, res) => {
  const { email, password } = req.body
  const errors = []

  // Validation
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
    return res.status(400).json({ error: errors.join(", ") + "." })
  }

  const hashedPassword = md5(password) // Hash the password

  try {
    // Find the user by email using Sequelize
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(400).json({
        error: `User ${email} does not exist, register a user first!`,
      })
    }

    // Check if the password matches
    if (user.password !== hashedPassword) {
      return res.status(400).json({ error: "Invalid password." })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      getSecretKey()
    )

    res.status(200).json({
      message: "User successfully logged in!",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token: token,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "An error occurred while logging in." })
  }
})

module.exports = router
