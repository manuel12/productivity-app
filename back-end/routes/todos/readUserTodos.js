const express = require("express")
const router = express.Router()
const { authenticateToken } = require("../../utils")
const Todo = require("../../models/Todo") // Import your Sequelize Todo model

router.get("/api/todos/user", authenticateToken, async (req, res) => {
  const userId = req.user.id // Get the user ID from the authenticated token

  try {
    // Fetch all todos for the authenticated user using Sequelize
    const todos = await Todo.findAll({ where: { createdBy: userId } })

    res.status(200).json({
      message: "User's todos successfully retrieved!",
      data: todos,
    })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ error: "An error occurred while retrieving user's todos." })
  }
})

module.exports = router
