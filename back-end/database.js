const sqlite3 = require("sqlite3").verbose()
const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open db
    console.error(err.message)
    throw err
  } else {
    console.log("Connected to Sqlite DB.")

    const createTodoTableSQL = `CREATE TABLE IF NOT EXISTS Todo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      completed BOOLEAN,
      description VARCHAR(40),
      dateCompleted TEXT
    )`

    db.run(createTodoTableSQL, (err) => {
      if (err) {
        // Table already created
        console.error(err.message)
        throw err
      } else {
        // Table created!
        console.log("Succesfully created Todo database!")
      }
    })

    const createDailyTableSQL = `CREATE TABLE IF NOT EXISTS Daily (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    completed BOOLEAN,
    description VARCHAR(40),
    dateCreated TEXT,
    streakCounter INTEGER,
    lastCompletedDate TEXT
  )`

    db.run(createDailyTableSQL, (err) => {
      if (err) {
        // Table already created
        console.error(err.message)
        throw err
      } else {
        // Table created!
        console.log("Succesfully created Daily database!")
      }
    })
  }
})

module.exports = db
