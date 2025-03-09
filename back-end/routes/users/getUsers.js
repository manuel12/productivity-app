const express = require("express")
const router = express.Router()
const User = require("../../models/User") // Import your Sequelize User model

router.get("/api/users", async (req, res) => {
  try {
    // Fetch all users using Sequelize
    const users = await User.findAll()

    res.status(200).json({
      message: "Users successfully retrieved!",
      data: users,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "An error occurred while retrieving users." })
  }
})

module.exports = router
