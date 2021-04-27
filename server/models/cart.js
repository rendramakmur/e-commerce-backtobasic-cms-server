'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, { foreignKey: 'UserId' })
      Cart.belongsTo(models.Product, { foreignKey: 'ProductId' })
    }
  };
  Cart.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      min: {
        args: [0],
        msg: 'Quantity must be greater than 0'
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
    hooks: {
      beforeCreate (instance) {
        if (!instance.quantity) {
          instance.quantity = 1;
        }
      }
    }
  });
  return Cart;
};