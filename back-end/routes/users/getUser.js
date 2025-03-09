const express = require("express")
const router = express.Router()
const User = require("../../models/User") // Import your Sequelize User model

router.get("/api/user/:id", async (req, res) => {
  const userId = req.params.id

  // Check if userId exists, is a valid number, and not an empty string
  if (!userId || isNaN(userId) || userId.trim() === "") {
    return res.status(400).json({ error: "Invalid user ID" })
  }

  try {
    // Find the user by ID using Sequelize
    const user = await User.findOne({ where: { id: userId } })

    if (user) {
      res.status(200).json({
        message: "User successfully retrieved!",
        data: user,
      })
    } else {
      res.status(404).json({
        message: `User with id: ${userId} not found.`,
        data: null,
      })
    }
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the user." })
  }
})

module.exports = router
