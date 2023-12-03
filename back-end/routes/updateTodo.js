const express = require("express")
const router = express.Router()
const db = require("../database")

router.patch("/api/todos/:id", (req, res, next) => {
  const id = Number(req.params.id)

  if (isNaN(id) || id <= 0) {
    console.log("400 - 1")
    return res.status(400).json({ error: "Invalid (NaN) todo id" })
  }

  const updatedTodo = {
    completed: req.body.completed,
    description: req.body.description,
    dateCompleted: req.body.dateCompleted,
  }
  console.log(updatedTodo)

  const errors = []
  if (typeof updatedTodo.completed !== "boolean") {
    errors.push("No completed (boolean) specified")
  }

  if (
    typeof updatedTodo.description !== "string" ||
    updatedTodo.description.length == 0
  ) {
    errors.push("No description specified")
  }

  if (errors.length) {
    console.log("400 - 2")
    return res.status(400).json({ error: errors.join(", ") + "." })
  }

  const checkTodoExistsSQL = "SELECT * FROM Todo WHERE id = ?"
  const updateSQL = `UPDATE Todo set 
    completed = coalesce(?,completed), 
    description = coalesce(?,description), 
    dateCompleted = coalesce(?,dateCompleted)
    WHERE id = ?`

  db.all(checkTodoExistsSQL, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: res.message })
    }

    if (!row) {
      // Todo with given id does not exist
      console.log("400 - 3")
      return res.status(400).json({ error: "Todo not found" })
    }

    // Todo with  specific id exists proceed with update
    db.run(
      updateSQL,
      [
        updatedTodo.completed,
        updatedTodo.description,
        updatedTodo.dateCompleted,
        id,
      ],
      function (err) {
        if (err) {
          console.log("400 - 4")
          console.log(err)
          return res.status(400).json({ error: res.message })
        }

        // Check if any rows were affected (i.e., if the Todo was updated)
        if (this.changes === 0) {
          return res.status(404).json({ error: `Todo with id ${id} not found` })
        }

        return res.json({
          message: "Todo successfully updated!",
          data: updatedTodo,
        })
      }
    )
  })
})

module.exports = router
