const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const getTodosRouter = require("./routes/getTodos")
const getTodoRouter = require("./routes/getTodo")
const createTodoRouter = require("./routes/createTodo")
const deleteTodoRouter = require("./routes/deleteTodo")

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

// Delete a todo
app.use(deleteTodoRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
