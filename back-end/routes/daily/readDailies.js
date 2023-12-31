const express = require("express")
const router = express.Router()
const db = require("../../database")

router.get("/api/dailies/", function (req, res, next) {
  const querySQL = "SELECT * FROM Daily"
  const params = []
  db.all(querySQL, params, (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }
    res.json({
      message: "Dailies successfully retrieved!",
      data: row.map((dbItem) => {
        // Convert completed value from 1 or 0 to true or false
        const completed = dbItem.completed
        dbItem.completed = completed ? true : false
        return dbItem
      }),
    })
  })
})

module.exports = router
