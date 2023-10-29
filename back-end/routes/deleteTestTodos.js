const express = require("express")
const router = express.Router()
const db = require("../database")

router.delete("/api/todos/delete-test-todos", (req, res, next) => {
  db.run(
    `DELETE FROM Todo WHERE description LIKE '%test%'`,
    function (err, result) {
      if (err) {
        return res.status(400).json({ error: res.message })
      }
      res.status(204).end()
    }
  )
})

module.exports = router
