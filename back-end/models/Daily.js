const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Daily = sequelize.define("Daily", {
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
  dateCreated: {
    type: DataTypes.TEXT,
  },
  streakCounter: {
    type: DataTypes.INTEGER,
  },
  lastCompletedDate: {
    type: DataTypes.TEXT,
  },
})

// Define associations
Daily.associate = (models) => {
  Daily.belongsTo(models.User, { foreignKey: "createdBy" })
}

module.exports = Daily
