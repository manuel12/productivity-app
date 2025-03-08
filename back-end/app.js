const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

// Sequelize DB
const sequelize = require("./config/database")
const User = require("./models/User")
const Todo = require("./models/Todo")
const Daily = require("./models/Daily")

// Sync all models
sequelize
  .sync({ force: true }) // Use `force: true` to drop and recreate tables (for development only)
  .then(() => {
    console.log("[Sequelize] - Database & tables created!")

    // Optionally, seed the database with initial data
    // Optionally, seed the database with initial data
    User.bulkCreate([
      {
        username: "Manuel",
        email: "manuelpinedacabeza@gmail.com",
        password: "797a7c857db9b3145cb5189590cf13a4", // Replace with actual hashed passwords
      },
      {
        username: "testuser",
        email: "testuser1@gmail.com",
        password: "797a7c857db9b3145cb5189590cf13a4",
      },
      {
        username: "testuser",
        email: "testuser2@gmail.com",
        password: "797a7c857db9b3145cb5189590cf13a4",
      },
    ]).then(() => {
      console.log("[Sequelize] - Initial users created!")
    })
  })
  .catch((err) => {
    console.error("Unable to sync database:", err)
  })

// User routes
// const loginUserRouter = require("./routes/users/loginUser")
const loginUserRouter = require("./routes/users/loginUser")

// const createUserRouter = require("./routes/users/createUser")
const createUserRouter = require("./routes/users/createUser")

// const getUsersRouter = require("./routes/users/getUsers")
const getUsersRouter = require("./routes/users/getUsers")

// const getUserRouter = require("./routes/users/getUser")
const getUserRouter = require("./routes/users/getUser")

// const updateUserRouter = require("./routes/users/updateUser")
const updateUserRouter = require("./routes/users/updateUser")

// const deleteUserRouter = require("./routes/users/deleteUser")
const deleteUserRouter = require("./routes/users/deleteUser")

// Warning!
// const deleteTestUsersRouter = require("./routes/users/deleteTestUsers")
const deleteTestUsersRouter = require("./routes/users/deleteTestUsers")

// const readTodosRouter = require("./routes/todos/readTodos")
const readTodosRouter = require("./routes/todos/readTodos")

// const readUserTodosRouter = require("./routes/todos/readUserTodos")
const readUserTodosRouter = require("./routes/todos/readUserTodos")

// const readTodoRouter = require("./routes/todos/readTodo")
const readTodoRouter = require("./routes/todos/readTodo")

// const createTodoRouter = require("./routes/todos/createTodo")
const createTodoRouter = require("./routes/todos/createTodo")

// const updateTodoRouter = require("./routes/todos/updateTodo")
const updateTodoRouter = require("./routes/todos/updateTodo")

// const deleteTodoRouter = require("./routes/todos/deleteTodo")
const deleteTodoRouter = require("./routes/todos/deleteTodo")

// WARNING!
const deleteTestTodos = require("./routes/todos/deleteTestTodos")

// const readDailiesRouter = require("./routes/dailies/readDailies")
// const readDailyRouter = require("./routes/dailies/readDaily")
// const createDailyRouter = require("./routes/dailies/createDaily")
// const updateDailyRouter = require("./routes/dailies/updateDaily")
// const deleteDailyRouter = require("./routes/dailies/deleteDaily")
// // WARNING!
// const deleteTestDailies = require("./routes/dailies/deleteTestDailies")

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())

// Or allow specific origins
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Allow all HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
)

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

app.use(readUserTodosRouter)

app.use(readTodoRouter)

app.use(createTodoRouter)

app.use(updateTodoRouter)

app.use(deleteTodoRouter)

// Warning!
app.use(deleteTestTodos)
// -------------------------

// // DAILIES -------------------
// app.use(readDailiesRouter)

// app.use(readDailyRouter)

// app.use(createDailyRouter)

// app.use(updateDailyRouter)

// app.use(deleteDailyRouter)

// // Warning!
// app.use(deleteTestDailies)
// -------------------------

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
