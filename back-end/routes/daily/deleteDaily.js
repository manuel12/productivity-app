const express = require("express")
const router = express.Router()
const db = require("../../database")

router.delete("/api/dailies/:id", (req, res, next) => {
  if (req.params.id === "delete-test-dailies") return next()

  const id = Number(req.params.id)

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid (NaN) todo id" })
  }

  const checkDailyExistsSQL = "SELECT * FROM Daily WHERE id = ?"
  const deleteSQL = "DELETE FROM Daily WHERE id = ?"

  db.all(checkDailyExistsSQL, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: res.message })
    }

    if (!row) {
      // Daily with given id does not exist
      return res.status(400).json({ error: `Daily with id ${id} not found` })
    }

    // Daily with  specific id exists proceed with deletion
    db.run(deleteSQL, id, function (err) {
      if (err) {
        return res.status(500).json({ error: res.message })
      }

      // Check if any rows were affected (i.e., if the Daily was deleted)
      if (this.changes === 0) {
        return res.status(404).json({ error: `Daily with id ${id} not found` })
      }

      return res.status(204).end()
    })
  })
})

module.exports = router
