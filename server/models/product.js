'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {foreignKey: 'UserId'})
      Product.belongsToMany(models.User, { through: models.Cart, foreignKey: 'ProductId' })
      Product.hasMany(models.Cart, { foreignKey: 'ProductId' })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Product name is required'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Category is required'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image URL is required'
        },
        isUrl: {
          args: true,
          msg: 'Image URL must be in URL format'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price is required'
        },
        isInt: {
          args: true,
          msg: 'Price must be in number format'
        },
        min: {
          args: [0],
          msg: 'Price must be greater than 0'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Stock is required'
        },
        isInt: {
          args: true,
          msg: 'Stock must be in integer format'
        },
        min: {
          args: [0],
          msg: 'Stock must be greater than 0'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'UserId is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};