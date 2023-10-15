const express = require("express")
const router = express.Router()
const db = require("../database")

router.patch("/api/todos/:id", (req, res, next) => {
  const updatedTodo = req.body

  const updateSQL = `UPDATE Todo set 
    completed = coalesce(?,completed), 
    description = COALESCE(?,description)
    WHERE id = ?`

  db.run(
    updateSQL,
    [updatedTodo.completed, updatedTodo.description, req.params.id],
    (err) => {
      if (err) {
        return res.status(400).json({ error: res.message })
      }

      res.json({
        message: "Todo successfully updated!",
        data: updatedTodo,
      })
    }
  )
})

module.exports = router
