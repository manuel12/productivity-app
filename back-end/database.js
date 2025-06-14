const sqlite3 = require("sqlite3").verbose()
const md5 = require("md5")
const DBSOURCE = process.env.NODE_ENV === "test" ? "test.sqlite" : "db.sqlite"

console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)

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

        db.run(insert, ["testuser", "test_user@gmail.com", md5("Testpass1!")])

        db.run(insert, ["demo_user", "demo_user@gmail.com", md5("Testpass1!")])
      }
    })
    console.log("Succesfully created User table!")

    const createTodoTableSQL = `CREATE TABLE IF NOT EXISTS Todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    createdBy INTEGER,
    completed BOOLEAN DEFAULT false,
    description TEXT,
    dateCompleted TEXT,
    FOREIGN KEY (createdBy) REFERENCES User(id)
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
    createdBy INTEGER,
    completed BOOLEAN DEFAULT 0,
    description TEXT,
    dateCreated TEXT,
    streakCounter INTEGER,
    lastCompletedDate TEXT,
    FOREIGN KEY (createdBy) REFERENCES User(id)
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
