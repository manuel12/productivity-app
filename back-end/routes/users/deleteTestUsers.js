const express = require("express")
const router = express.Router()
const User = require("../../models/User") // Import your Sequelize User model
const { Op } = require("sequelize") // Import Sequelize's Operators

router.delete("/api/users/delete-test-users", async (req, res) => {
  try {
    // Delete all users with emails containing 'testuser'
    const result = await User.destroy({
      where: {
        email: {
          [Op.like]: "%testuser%", // Use Sequelize's `like` operator
        },
      },
    })

    // If no users were deleted, return a 404
    if (result === 0) {
      return res.status(404).json({ error: "No test users found." })
    }

    // Respond with a 204 status (No Content)
    res.status(204).end()
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ error: "An error occurred while deleting test users." })
  }
})

module.exports = router
