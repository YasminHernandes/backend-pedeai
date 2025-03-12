'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Product, {
        foreignKey: "product_id",
      });
      Order.belongsTo(models.Restaurant, {
        foreignKey: "restaurant_id"
      });
      Order.belongsTo(models.Buyer, {
        foreignKey: "buyer_id"
      });
    }
  }
  Order.init({
    product_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    total_price: DataTypes.FLOAT,
    total_service_price: DataTypes.FLOAT,
    restaurant_id: DataTypes.INTEGER,
    buyer_id: DataTypes.INTEGER,
    canceled: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};