const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const readTodosRouter = require("./routes/todo/readTodos")
const readTodoRouter = require("./routes/todo/readTodo")
const createTodoRouter = require("./routes/todo/createTodo")
const updateTodoRouter = require("./routes/todo/updateTodo")
const deleteTodoRouter = require("./routes/todo/deleteTodo")
// WARNING!
const deleteTestTodos = require("./routes/todo/deleteTestTodos")

const readDailiesRouter = require("./routes/daily/readDailies")
const readDailyRouter = require("./routes/daily/readDaily")
const createDailyRouter = require("./routes/daily/createDaily")
const updateDailyRouter = require("./routes/daily/updateDaily")
const deleteDailyRouter = require("./routes/daily/deleteDaily")
// WARNING!
const deleteTestDailies = require("./routes/daily/deleteTestDailies")

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

// Get all dailies
app.use(readDailiesRouter)

// Get a single daily
app.use(readDailyRouter)

// Create a daily
app.use(createDailyRouter)

// Update a daily
app.use(updateDailyRouter)

// Delete a daily
app.use(deleteDailyRouter)

// Delete test dailies
app.use(deleteTestDailies)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
