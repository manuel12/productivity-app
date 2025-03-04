const { Sequelize } = require("sequelize")
const config = require("./config.json")

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
