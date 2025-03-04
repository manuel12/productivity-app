const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Todo = sequelize.define("Todo", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dateCompleted: {
    type: DataTypes.TEXT,
  },
})

console.log("TODO MODEL CREATED!!!")
console.log(Todo)

// Define associations
Todo.associate = (models) => {
  Todo.belongsTo(models.User, { foreignKey: "createdBy" })
}

module.exports = Todo
