const express = require("express")
const router = express.Router()
const User = require("../../models/User") // Import your Sequelize User model
const { Op } = require("sequelize") // Import Sequelize's Operators

router.delete("/api/users/delete-test-users", async (req, res) => {
  try {
    // Delete all users with emails containing 'testuser'
    const deletedUsersCount = await User.destroy({
      where: {}, // An empty where clause or omitting it will delete all records
      truncate: true, // Optional: Resets the table, including auto-incrementing IDs.
      // Use with caution as it's more destructive.
    })

    // If no users were deleted, return a 404
    if (deletedUsersCount === 0) {
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
