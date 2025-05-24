const express = require("express")
const router = express.Router()
const { authenticateToken } = require("../../utils")
const Todo = require("../../models/Todo") // Import your Sequelize Todo model

router.delete(
  "/api/todos/delete-test-todos",
  //authenticateToken,
  async (req, res) => {
    try {
      // Delete all todos where the description contains "test"
      const deletedTodosCount = await Todo.destroy({
        where: {}, // An empty where clause or omitting it altogether deletes all records
        truncate: true, // This is a more efficient way to delete all records in some databases (e.g., PostgreSQL, MySQL)
        // It effectively resets the table, including auto-incrementing IDs.
        // Be cautious with this if you need to preserve IDs or related data.
      })

      let resMessage
      if (deletedTodosCount > 0) {
        // At least one todo was deleted
        resMessage = `${deletedTodosCount} todos containing deleted.`
      } else {
        // No todos matched the criteria
        resMessage = "No todos containing 'test' found."
      }
      return res.status(204).json({
        message: resMessage,
      })
    } catch (err) {
      console.error(err)
      res
        .status(500)
        .json({ error: "An error occurred while deleting the test todos." })
    }
  }
)

module.exports = router
