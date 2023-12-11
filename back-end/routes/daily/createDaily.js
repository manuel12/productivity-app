const express = require("express")
const router = express.Router()
const db = require("../../database")

router.post("/api/dailies", (req, res, next) => {
  const errors = []
  const newDaily = {
    completed: req.body.completed,
    description: req.body.description,
    dateCreated: req.body.dateCreated || "",
    streakCounter: req.body.streakCounter || 0,
    lastCompletedDate: req.body.lastCompletedDate || "",
  }

  console.log(newDaily)

  if (typeof newDaily.completed !== "boolean") {
    errors.push("No completed (boolean) specified")
  }

  if (
    typeof newDaily.description !== "string" ||
    newDaily.description.length == 0
  ) {
    errors.push("No description specified")
  }

  if (errors.length) {
    return res.status(400).json({ error: errors.join(", ") + "." })
  }

  const insertSQL =
    "INSERT INTO Daily (completed, description, dateCreated, streakCounter, lastCompletedDate) VALUES (?, ?, ?, ?, ?)"

  db.run(
    insertSQL,
    [
      newDaily.completed,
      newDaily.description,
      newDaily.dateCreated,
      newDaily.streakCounter,
      newDaily.lastCompletedDate,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: res.error })
      }
      res.status(201).json({
        message: "Daily successfully created!",
        data: {
          id: this.lastID,
          completed: newDaily.completed,
          description: newDaily.description,
          dateCreated: newDaily.dateCreated,
          streakCounter: newDaily.streakCounter,
          lastCompletedDate: newDaily.lastCompletedDate,
        },
        id: this.lastID,
      })
    }
  )
})

module.exports = router
