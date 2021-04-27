'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/password-helper');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: 'UserId' })
      User.hasMany(models.Banner, { foreignKey: 'UserId' })
      User.belongsToMany(models.Product, { through: models.Cart, foreignKey: 'UserId' })
      User.hasMany(models.Cart, { foreignKey: 'UserId' })
    }
  };
  User.init({
    full_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Full name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is required'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Role is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance) {
        if (!instance.role) {
          instance.role = 'customer'
        }
        instance.password = hashPassword(instance.password)
      }
    }
  });
  return User;
};