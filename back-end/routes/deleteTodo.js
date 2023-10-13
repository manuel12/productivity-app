const express = require("express")
const router = express.Router()
const db = require("../database")

// Delete a todo by ID
router.delete("/todos/:id", (req, res, next) => {
  const id = req.params.id

  const insertSQL = "DELETE FROM todos WHERE id = ?"

  db.run(insertSQL, id, (err) => {
    if (err) {
      console.error(err.message)
      return res.status(500).json({ error: "Internal Server Error" })
    }
    res.json({ message: "Todo deleted successfully", id })
  })
})

module.exports = router
