'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Restaurant, {
        foreignKey: "restaurant_id",
        onDelete: "CASCADE"
      });
      Product.hasMany(models.Order, {
        foreignKey: "product_id",
      })  
    }
  }
  Product.init({
    name: DataTypes.STRING,
    value: DataTypes.FLOAT,
    description: DataTypes.STRING,
    restaurant_id: DataTypes.INTEGER,
    canceled: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};