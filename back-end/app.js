const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const getTodosRouter = require("./routes/getTodos")
const getTodoRouter = require("./routes/getTodo")
const createTodoRouter = require("./routes/createTodo")
const updateTodoRouter = require("./routes/updateTodo")
const deleteTodoRouter = require("./routes/deleteTodo")
// WARNING!
const deleteTestTodos = require("./routes/deleteTestTodos")

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())
app.use(cors())

// Get all todos
app.use(getTodosRouter)

// Get a single todo
app.use(getTodoRouter)

// Create a todo
app.use(createTodoRouter)

// Update a todo
app.use(updateTodoRouter)

// Delete a todo
app.use(deleteTodoRouter)

// Delete test todos
app.use(deleteTestTodos)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
