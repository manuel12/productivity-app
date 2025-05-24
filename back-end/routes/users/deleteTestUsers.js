const express = require("express")
const router = express.Router()
const { authenticateToken } = require("../../utils")
const User = require("../../models/User") // Import your Sequelize User model

router.delete(
  "/api/users/delete-test-users",
  //authenticateToken,
  async (req, res) => {
    try {
      // Delete all users with emails containing 'testuser'
      const deletedUsersCount = await User.destroy({
        where: {}, // An empty where clause or omitting it will delete all records
        truncate: true, // Optional: Resets the table, including auto-incrementing IDs.
        // Use with caution as it's more destructive.
      })

      let resMessage
      if (deletedUsersCount === 0) {
        resMessage = "No test users found."
      } else {
        resMessage = "Users successfully deleted!"
      }

      // Respond with a 204 status (No Content)
      return res.status(204).json({ message: resMessage }).end()
    } catch (err) {
      console.error(err)
      res
        .status(500)
        .json({ error: "An error occurred while deleting test users." })
    }
  }
)

module.exports = router
