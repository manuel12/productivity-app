const sqlite3 = require("sqlite3").verbose()
const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open db
    console.error(err.message)
    throw err
  } else {
    console.log("Connected to Sqlite DB.")

    const createTableSQL = `CREATE TABLE IF NOT EXISTS Todo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      completed BOOLEAN,
      todoText VARCHAR(40)
    )`

    db.run(createTableSQL, (err) => {
      if (err) {
        // Table already created
        console.error(err.message)
        throw err
      } else {
        // Table just created, creating some rows
        const insertSQL =
          "INSERT OR REPLACE INTO Todo (completed, todoText) VALUES (?, ?)"

        db.run(insertSQL, ["false", "Feed the cats"])
      }
    })
    console.log("Succesfully created Todo database!")
  }
})

module.exports = db
