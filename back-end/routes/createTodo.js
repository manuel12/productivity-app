const express = require("express")
const router = express.Router()
const db = require("../database")

/* POST new todo */
router.post("/api/todos", (req, res, next) => {
  const newTodo = {
    completed: req.body.completed, // Make sure these properties exist in req.body
    text: req.body.text,
  }
  const errors = []
  if (typeof req.body.completed !== "boolean") {
    errors.push("No completed (boolean) specified")
  }

  if (!req.body.text) {
    errors.push("No text specified")
  }

  if (errors.length) {
    res.status(400).json({ error: errors.join(", ") })
    return
  }

  const insertSQL = "INSERT INTO Todo (completed, todoText) VALUES (?, ?)"

  db.run(insertSQL, [newTodo.completed, newTodo.text], (err) => {
    if (err) {
      console.error(err.message)
      return res.status(500).json({ error: "Internal Server Error" })
    }
    res.json({ message: "Todo added successfully", todo: newTodo })
  })
})

module.exports = router
