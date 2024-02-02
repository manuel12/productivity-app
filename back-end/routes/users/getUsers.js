const express = require("express")
const router = express.Router()
const db = require("../../database")

/* GET users listing. */
router.get("/api/users", function (req, res, next) {
  const selectSQL = "select * from User"
  const params = []
  db.all(selectSQL, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.json({
      message: "Users successfully retrieved!",
      data: rows,
    })
  })
})

module.exports = router
