'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    
    static associate(models) {
      Restaurant.hasMany(models.Product, {
        foreignKey: "restaurant_id"
      });
      Restaurant.hasMany(models.Order, {
        foreignKey: "restaurant_id"
      })
    }
  }
  Restaurant.init({
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    has_service_tax: DataTypes.BOOLEAN,
    canceled_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};