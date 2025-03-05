const express = require("express")
const router = express.Router()
const md5 = require("md5")
const User = require("../../models/User") // Import your Sequelize User model

router.post("/api/user/", async (req, res) => {
  const { username, email, password } = req.body
  const errors = []

  // Validation
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
    return res.status(400).json({ error: errors.join(", ") + "." })
  }

  const hashedPassword = md5(password) // Hash the password

  try {
    // Create a new user using Sequelize
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    res.status(201).json({
      message: `User ${email} successfully registered!`,
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    })
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      console.error(err.name)
      // Handle duplicate email error
      return res
        .status(400)
        .json({ error: `A user with email ${email} already exists!` })
    }

    res
      .status(500)
      .json({ error: "An error occurred while registering the user." })
  }
})

module.exports = router
