const express = require("express")
const router = express.Router()
const { authenticateToken } = require("../../utils")
const Todo = require("../../models/Todo") // Import your Sequelize Todo model

router.delete("/api/todo/:id", authenticateToken, async (req, res) => {
  const id = Number(req.params.id)

  // Validate the ID
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid (NaN) todo id" })
  }

  try {
    // Check if the Todo exists
    const todo = await Todo.findOne({ where: { id } })

    if (!todo) {
      return res.status(404).json({ error: `Todo with id ${id} not found` })
    }

    // Delete the Todo
    await todo.destroy()

    // Respond with a 204 status (No Content)
    return res.status(204).end()
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ error: "An error occurred while deleting the todo." })
  }
})

module.exports = router
