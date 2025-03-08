const express = require("express")
const router = express.Router()
const Todo = require("../../models/Todo") // Import your Sequelize Todo model
const { Op } = require("sequelize") // Import Sequelize operators

router.delete("/api/todos/delete-test-todos", async (req, res) => {
  try {
    // Delete all todos where the description contains "test"
    const deletedTodos = await Todo.destroy({
      where: {
        description: {
          [Op.like]: "%test%", // Use Op.like for case-insensitive substring matching
        },
      },
    })

    if (deletedTodos > 0) {
      // At least one todo was deleted
      return res
        .status(204)
        .json({ message: `${deletedTodos} todos containing "test" deleted.` })
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
