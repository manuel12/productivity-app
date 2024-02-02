const express = require("express")
const router = express.Router()
const db = require("../../database")
const { authenticateToken } = require("../../utils")

router.delete(
  "/api/todos/delete-test-todos",
  authenticateToken,
  (req, res, next) => {
    db.run(
      `DELETE FROM Todo WHERE description LIKE '%test%'`,
      function (err, result) {
        if (err) {
          return res.status(400).json({ error: res.message })
        }
        res.status(204).end()
      }
    )
  }
)

module.exports = router
