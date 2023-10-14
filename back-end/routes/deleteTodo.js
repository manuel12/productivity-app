const express = require("express")
const router = express.Router()
const db = require("../database")

router.delete("/api/todos/:id", (req, res, next) => {
  const id = req.params.id

  if (id === "delete-test-todos") return next()

  const insertSQL = "DELETE FROM Todo WHERE id = ?"

  db.run(insertSQL, id, (err) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" })
    }
    res.json({ message: "Todo successfully deleted!", id })
  })
})

module.exports = router
