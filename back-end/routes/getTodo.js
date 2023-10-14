const express = require("express")
const router = express.Router()
const db = require("../database")

router.get("/api/todos/:id", function (req, res, next) {
  const querySQL = "SELECT * FROM Todo WHERE id = ?"
  const params = [req.params.id]

  db.all(querySQL, params, (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }
    res.json({
      message: row
        ? "Todo successfully retrieved!"
        : `Todo with id: ${params} not found.`,
      data: row,
    })
  })
})

module.exports = router
