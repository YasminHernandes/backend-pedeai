'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buyer extends Model {
    static associate(models) {
      Buyer.hasMany(models.Order, {
        foreignKey: "buyer_id"
      });
    }
  }
  Buyer.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Buyer',
  });
  return Buyer;
};