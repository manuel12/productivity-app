const express = require("express")
const router = express.Router()
const db = require("../../database")
const { authenticateToken } = require("../../utils")

router.get("/api/todos/user", authenticateToken, (req, res, next) => {
  const querySQL = "SELECT * FROM Todo WHERE createdBy = ?"
  const userId = req.user.id

  db.all(querySQL, [userId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    if (row.length > 0) {
      res.status(200).json({
        message: "User's todos successfully retrieved!",
        data: row,
      })
    } else {
      res.status(400).json({
        message: `User's todos not found.`,
        data: row,
      })
    }
  })
})

module.exports = router
