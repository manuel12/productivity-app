const { DataTypes } = require("sequelize")
const sequelize = require("../config/database") // Import your Sequelize instance

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

//  Define associations
User.associate = (models) => {
  User.hasMany(models.Todo, { foreignKey: "createdBy" })
  User.hasMany(models.Daily, { foreignKey: "createdBy" })
}

module.exports = User
