"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "order",
    {
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      is_booked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      is_done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      order_end_time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {}
  );
  Order.associate = function(models) {};
  return Order;
};
