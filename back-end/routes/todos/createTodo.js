const express = require("express")
const router = express.Router()
const db = require("../../database")
const { authenticateToken } = require("../../utils")

router.post("/api/todo", authenticateToken, (req, res, next) => {
  const errors = []
  const { completed, description } = req.body

  if (typeof completed !== "boolean") {
    errors.push("No completed (boolean) specified")
  }

  if (typeof description !== "string" || description.length == 0) {
    errors.push("No description (string) specified")
  } else {
    if (description?.length < 3) {
      errors.push("Description must be at least 3 characters")
    }

    if (description?.length > 39) {
      errors.push("Description must be shorter than 40 characters")
    }
  }

  if (errors.length) {
    return res.status(400).json({ error: errors.join(", ") + "." })
  }

  const createdBy = req.user.id

  const insertSQL =
    "INSERT INTO Todo (createdBy, completed, description) VALUES (?,?,?)"

  db.run(insertSQL, [createdBy, completed, description], function (err) {
    if (err) {
      return res.status(500).json({ error: res.error })
    }
    res.status(201).json({
      message: "Todo successfully created!",
      data: {
        id: this.lastID,
        createdBy,
        completed,
        description,
      },
      id: this.lastID,
    })
  })
})

module.exports = router
