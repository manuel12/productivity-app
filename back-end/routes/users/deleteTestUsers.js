const express = require("express")
const router = express.Router()
const db = require("../../database")

router.delete("/api/users/delete-test-users", (req, res, next) => {
  db.run(`DELETE FROM User WHERE email LIKE '%testuser%'`, (err, result) => {
    if (err) {
      return res.status(400).json({ error: res.message })
    }
    res.status(204).end()
  })
})

module.exports = router
