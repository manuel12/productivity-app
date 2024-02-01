const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

// User routes
const loginUserRouter = require("./routes/users/loginUser")
const createUserRouter = require("./routes/users/createUser")

const getUsersRouter = require("./routes/users/getUsers")
const getUserRouter = require("./routes/users/getUser")
const updateUserRouter = require("./routes/users/updateUser")
const deleteUserRouter = require("./routes/users/deleteUser")

// Warning!
const deleteTestUsersRouter = require("./routes/users/deleteTestUsers")

const readTodosRouter = require("./routes/todos/readTodos")
const readTodoRouter = require("./routes/todos/readTodo")
const createTodoRouter = require("./routes/todos/createTodo")
const updateTodoRouter = require("./routes/todos/updateTodo")
const deleteTodoRouter = require("./routes/todos/deleteTodo")
// WARNING!
const deleteTestTodos = require("./routes/todos/deleteTestTodos")

const readDailiesRouter = require("./routes/dailies/readDailies")
const readDailyRouter = require("./routes/dailies/readDaily")
const createDailyRouter = require("./routes/dailies/createDaily")
const updateDailyRouter = require("./routes/dailies/updateDaily")
const deleteDailyRouter = require("./routes/dailies/deleteDaily")
// WARNING!
const deleteTestDailies = require("./routes/dailies/deleteTestDailies")

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())
app.use(cors())

// AUTHENTICATION ----------
app.use(loginUserRouter)

app.use(createUserRouter)
// -------------------------

// USERS -------------------
app.use(getUsersRouter)

app.use(getUserRouter)

app.use(updateUserRouter)

app.use(deleteUserRouter)
// Warning!
app.use(deleteTestUsersRouter)
// -------------------------

// TODOS -------------------
app.use(readTodosRouter)

app.use(readTodoRouter)

app.use(createTodoRouter)

app.use(updateTodoRouter)

app.use(deleteTodoRouter)

// Warning!
app.use(deleteTestTodos)
// -------------------------

// DAILIES -------------------
app.use(readDailiesRouter)

app.use(readDailyRouter)

app.use(createDailyRouter)

app.use(updateDailyRouter)

app.use(deleteDailyRouter)

// Warning!
app.use(deleteTestDailies)
// -------------------------

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
