const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const readTodosRouter = require("./routes/readTodos")
const readTodoRouter = require("./routes/readTodo")
const createTodoRouter = require("./routes/createTodo")
const updateTodoRouter = require("./routes/updateTodo")
const deleteTodoRouter = require("./routes/deleteTodo")
// WARNING!
const deleteTestTodos = require("./routes/deleteTestTodos")

// WARNING!
const deleteTestDailies = require("./routes/deleteTestDailies")

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())
app.use(cors())

// Get all todos
app.use(readTodosRouter)

// Get a single todo
app.use(readTodoRouter)

// Create a todo
app.use(createTodoRouter)

// Update a todo
app.use(updateTodoRouter)

// Delete a todo
app.use(deleteTodoRouter)

// Delete test todos
app.use(deleteTestTodos)

// Delete test dailies
app.use(deleteTestDailies)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
