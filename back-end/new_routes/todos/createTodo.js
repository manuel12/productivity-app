const express = require("express")
const router = express.Router()
const { authenticateToken } = require("../../utils")
const Todo = require("../../models/Todo") // Import your Sequelize Todo model

router.post("/api/todo", authenticateToken, async (req, res) => {
  const errors = []
  const { completed, description } = req.body

  // Validation
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

  const createdBy = req.user.id // Get the user ID from the authenticated token

  try {
    // Create a new Todo using Sequelize
    const newTodo = await Todo.create({
      createdBy,
      completed,
      description,
    })

    // Respond with the created Todo
    res.status(201).json({
      message: "Todo successfully created!",
      data: newTodo,
      id: newTodo.id,
    })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ error: "An error occurred while creating the todo." })
  }
})

module.exports = router
