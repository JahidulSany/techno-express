const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Category extends Model {}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  },
);

// Export Post model
module.exports = Category;
