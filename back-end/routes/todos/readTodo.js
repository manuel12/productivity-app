const express = require("express")
const router = express.Router()
const { authenticateToken } = require("../../utils")
const Todo = require("../../models/Todo") // Import your Sequelize Todo model

router.get("/api/todo/:id", authenticateToken, async (req, res) => {
  const id = req.params.id

  try {
    // Find the Todo by ID using Sequelize
    const todo = await Todo.findOne({ where: { id } })

    if (todo) {
      res.status(200).json({
        message: "Todo successfully retrieved!",
        data: todo,
      })
    } else {
      res.status(404).json({
        message: `Todo with id ${id} not found.`,
        data: null,
      })
    }
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the todo." })
  }
})

module.exports = router
