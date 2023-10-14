const express = require("express")
const router = express.Router()
const db = require("../database")

router.post("/api/todos", (req, res, next) => {
  const newTodo = {
    completed: req.body.completed, // Make sure these properties exist in req.body
    description: req.body.description,
  }
  const errors = []
  if (typeof req.body.completed !== "boolean") {
    errors.push("No completed (boolean) specified")
  }

  if (!req.body.description) {
    errors.push("No description specified")
  }

  if (errors.length) {
    res.status(400).json({ error: errors.join(", ") })
    return
  }

  const insertSQL = "INSERT INTO Todo (completed, description) VALUES (?, ?)"

  db.run(insertSQL, [newTodo.completed, newTodo.description], function (err) {
    if (err) {
      console.error(err.message)
      return res.status(500).json({ error: "Internal Server Error" })
    }
    res.json({
      message: "Todo successfully created!",
      data: newTodo,
      id: this.lastID,
    })
  })
})

module.exports = router
