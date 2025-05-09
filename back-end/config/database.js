const { Sequelize } = require("sequelize")
// const config = require("./config.json")
process.env.NODE_ENV = ""

const config =
  process.env.NODE_ENV === "test"
    ? require("./test-config.json")
    : require("./config.json")

console.log(process.env.NODE_ENV)

const sequelize = new Sequelize(config.development)

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to SQLite has been established successfully.")
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err)
  })

module.exports = sequelize
