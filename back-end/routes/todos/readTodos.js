const express = require("express")
const router = express.Router()
const { authenticateToken } = require("../../utils")
const Todo = require("../../models/Todo") // Import your Sequelize Todo model

router.get("/api/todos/", authenticateToken, async (req, res) => {
  try {
    // Fetch all todos using Sequelize
    const todos = await Todo.findAll()

    // Map through the todos to convert `completed` from 1/0 to true/false
    const formattedTodos = todos.map((todo) => ({
      ...todo.toJSON(),
      completed: todo.completed ? true : false,
    }))

    res.status(200).json({
      message: "Todos successfully retrieved!",
      data: formattedTodos,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "An error occurred while retrieving todos." })
  }
})

module.exports = router
