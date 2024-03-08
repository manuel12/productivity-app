const express = require("express")
const router = express.Router()
const db = require("../../database")

router.patch("/api/dailies/:id", (req, res, next) => {
  const id = Number(req.params.id)

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid (NaN) todo id" })
  }

  const updatedDaily = {
    completed: req.body.completed,
    description: req.body.description,
    dateCreated: req.body.dateCreated,
    streakCounter: req.body.streakCounter,
    lastCompletedDate: req.body.lastCompletedDate,
  }

  const errors = []
  if (typeof updatedDaily.completed !== "boolean") {
    errors.push("No completed (boolean) specified")
  }

  if (
    typeof updatedDaily.description !== "string" ||
    updatedDaily.description.length == 0
  ) {
    errors.push("No description (string) specified")
  }

  if (errors.length) {
    return res.status(400).json({ error: errors.join(", ") + "." })
  }

  const checkDailyExistsSQL = "SELECT * FROM Daily WHERE id = ?"
  const updateSQL = `UPDATE Daily set 
    completed = coalesce(?,completed), 
    description = coalesce(?,description), 
    dateCreated = coalesce(?,dateCreated),
    streakCounter = coalesce(?,streakCounter),
    lastCompletedDate = coalesce(?,lastCompletedDate)
    WHERE id = ?`

  db.all(checkDailyExistsSQL, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: res.message })
    }

    if (!row) {
      // Daily with given id does not exist
      return res.status(400).json({ error: "Daily not found" })
    }

    // Daily with  specific id exists proceed with update
    db.run(
      updateSQL,
      [
        updatedDaily.completed,
        updatedDaily.description,
        updatedDaily.dateCreated,
        updatedDaily.streakCounter,
        updatedDaily.lastCompletedDate,
        id,
      ],
      function (err) {
        if (err) {
          return res.status(400).json({ error: res.message })
        }

        // Check if any rows were affected (i.e., if the Daily was updated)
        if (this.changes === 0) {
          return res
            .status(404)
            .json({ error: `Daily with id ${id} not found` })
        }

        return res.json({
          message: "Daily successfully updated!",
          data: updatedDaily,
        })
      }
    )
  })
})

module.exports = router
