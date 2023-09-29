const express = require("express")
const router = express.Router()
const db = require("../database")

/* GET todos listing. */
router.get("/api/todos/", function (req, res, next) {
  const querySQL = "SELECT * FROM Todo"
  const params = []
  db.all(querySQL, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.json({
      message: "Todos successfully retrieved!",
      data: row,
    })
  })
})

module.exports = router
