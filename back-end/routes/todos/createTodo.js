const express = require("express")
const router = express.Router()
const db = require("../../database")
const { authenticateToken } = require("../../utils")

router.post("/api/todo", authenticateToken, (req, res, next) => {
  const errors = []
  const newTodo = {
    completed: req.body.completed,
    description: req.body.description,
  }

  if (typeof newTodo.completed !== "boolean") {
    errors.push("No completed (boolean) specified")
  }

  if (
    typeof newTodo.description !== "string" ||
    newTodo.description.length == 0
  ) {
    errors.push("No description (string) specified")
  }

  if (errors.length) {
    return res.status(400).json({ error: errors.join(", ") + "." })
  }

  const insertSQL = "INSERT INTO Todo (completed, description) VALUES (?, ?)"

  db.run(insertSQL, [newTodo.completed, newTodo.description], function (err) {
    if (err) {
      return res.status(500).json({ error: res.error })
    }
    res.status(201).json({
      message: "Todo successfully created!",
      data: {
        id: this.lastID,
        completed: newTodo.completed,
        description: newTodo.description,
      },
      id: this.lastID,
    })
  })
})

module.exports = router
