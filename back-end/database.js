const sqlite3 = require("sqlite3").verbose()
const md5 = require("md5")
const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open db
    console.error(err.message)
    throw err
  } else {
    console.log("Connected to Sqlite DB.")

    const createUserTableSQL = `CREATE TABLE IF NOT EXISTS User (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT unique NOT NULL,
      password TEXT NOT NULL,
      CONSTRAINT email_unique UNIQUE (email)
      )`

    db.run(createUserTableSQL, (err) => {
      if (err) {
        // Table already created
        console.error(err.message)
        throw err
      } else {
        // Table just created, creating some rows
        let insert =
          "INSERT OR REPLACE INTO User (username, email, password) VALUES (?,?,?)"

        db.run(insert, [
          "Manuel",
          "manuelpinedacabeza@gmail.com",
          md5("Testpass1!"),
        ])

        insert =
          "INSERT OR REPLACE INTO User (username, email, password) VALUES (?,?,?)"

        db.run(insert, ["testuser", "testuser@gmail.com", md5("Testpass1!")])
      }
    })
    console.log("Succesfully created User table!")

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
        console.log("Succesfully created Todo table!")
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
        console.log("Succesfully created Daily table!")
      }
    })
  }
})

module.exports = db
