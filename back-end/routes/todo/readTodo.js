const express = require("express")
const router = express.Router()
const db = require("../../database")

router.get("/api/todos/:id", function (req, res, next) {
  const querySQL = "SELECT * FROM Todo WHERE id = ?"
  const id = req.params.id

  db.all(querySQL, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    if (row.length > 0) {
      res.status(200).json({
        message: "Todo successfully retrieved!",
        data: row,
      })
    } else {
      res.status(400).json({
        message: `Todo with id ${id} not found.`,
        data: row,
      })
    }
  })
})

module.exports = router
