const express = require("express")
const router = express.Router()
const { authenticateToken } = require("../../utils")
const Todo = require("../../models/Todo") // Import your Sequelize Todo model

router.patch("/api/todo/:id", authenticateToken, async (req, res) => {
  const id = Number(req.params.id)

  // Validate the ID
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid (NaN) todo id" })
  }

  const { completed, description, dateCompleted } = req.body

  // Validation
  const errors = []
  if (typeof completed !== "boolean") {
    errors.push("No completed (boolean) specified")
  }

  if (typeof description !== "string" || description.length === 0) {
    errors.push("No description (string) specified")
  } else {
    if (description.length < 3) {
      errors.push("Description must be at least 3 characters")
    }

    if (description.length > 39) {
      errors.push("Description must be shorter than 40 characters")
    }
  }

  if (errors.length) {
    return res.status(400).json({ error: errors.join(", ") + "." })
  }

  try {
    // Check if the Todo exists
    const todo = await Todo.findOne({ where: { id } })

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" })
    }

    // Update the Todo
    const updatedTodo = await todo.update({
      completed,
      description,
      dateCompleted,
    })

    res.status(200).json({
      message: "Todo successfully updated!",
      data: updatedTodo,
    })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ error: "An error occurred while updating the todo." })
  }
})

module.exports = router
