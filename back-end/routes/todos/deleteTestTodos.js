const express = require("express")
const router = express.Router()
const Todo = require("../../models/Todo") // Import your Sequelize Todo model
const { Op } = require("sequelize") // Import Sequelize operators

router.delete("/api/todos/delete-test-todos", async (req, res) => {
  try {
    // Delete all todos where the description contains "test"
    const deletedTodosCount = await Todo.destroy({
      where: {}, // An empty where clause or omitting it altogether deletes all records
      truncate: true, // This is a more efficient way to delete all records in some databases (e.g., PostgreSQL, MySQL)
      // It effectively resets the table, including auto-incrementing IDs.
      // Be cautious with this if you need to preserve IDs or related data.
    })

    if (deletedTodosCount > 0) {
      // At least one todo was deleted
      return res.status(204).json({
        message: `${deletedTodosCount} todos containing deleted.`,
      })
    } else {
      // No todos matched the criteria
      return res
        .status(204)
        .json({ message: "No todos containing 'test' found." })
    }
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ error: "An error occurred while deleting the test todos." })
  }
})

module.exports = router
