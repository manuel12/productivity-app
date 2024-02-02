const express = require("express")
const router = express.Router()
const db = require("../../database")
const { authenticateToken } = require("../../utils")

router.delete("/api/todos/:id", authenticateToken, (req, res, next) => {
  if (req.params.id === "delete-test-todos") return next()

  const id = Number(req.params.id)

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid (NaN) todo id" })
  }

  const checkTodoExistsSQL = "SELECT * FROM Todo WHERE id = ?"
  const deleteSQL = "DELETE FROM Todo WHERE id = ?"

  db.all(checkTodoExistsSQL, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: res.message })
    }

    if (!row) {
      // Todo with given id does not exist
      return res.status(400).json({ error: `Todo with id ${id} not found` })
    }

    // Todo with  specific id exists proceed with deletion
    db.run(deleteSQL, id, function (err) {
      if (err) {
        return res.status(500).json({ error: res.message })
      }

      // Check if any rows were affected (i.e., if the Todo was deleted)
      if (this.changes === 0) {
        return res.status(404).json({ error: `Todo with id ${id} not found` })
      }

      return res.status(204).end()
    })
  })
})

module.exports = router
