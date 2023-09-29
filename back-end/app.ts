const express = require("express")
const sqlite3 = require("sqlite3")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
const port = process.env.PORT || 4000
const getTodosRouter = require("./routes/getTodos")

app.use(bodyParser.json())
app.use(cors())

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// // Assuming your Todo interface is defined in a separate file.

// Get all todos
app.use(getTodosRouter)

// // Add a new todo
// app.post("/todos", (req, res) => {
//   const newTodo = {
//     completed: req.body.completed, // Make sure these properties exist in req.body
//     todoText: req.body.todoText,
//   }

//   db.run(
//     "INSERT INTO todos (completed, todoText) VALUES (?, ?)",
//     [newTodo.completed, newTodo.todoText],
//     (err) => {
//       if (err) {
//         console.error(err.message)
//         return res.status(500).json({ error: "Internal Server Error" })
//       }
//       res.json({ message: "Todo added successfully", todo: newTodo })
//     }
//   )
// })

// // Delete a todo by ID
// app.delete("/todos/:id", (req, res) => {
//   const id = req.params.id

//   db.run("DELETE FROM todos WHERE id = ?", id, (err) => {
//     if (err) {
//       console.error(err.message)
//       return res.status(500).json({ error: "Internal Server Error" })
//     }
//     res.json({ message: "Todo deleted successfully", id })
//   })
// })
