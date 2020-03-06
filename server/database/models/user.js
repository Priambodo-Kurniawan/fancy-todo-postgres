'use strict';
const { hashPassword } = require('../../helpers/bcriptjs');

module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;
  class User extends Model {}

  User.init({
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Email must be filled!'
      },
      unique: {
        args: true,
        msg: 'Email address already in use!'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Email format wrong!'
        },
        notEmpty: {
          args: true,
          msg: 'Email must be filled!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Password required!'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password must be filled!'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password);
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Todo, {
      foreignKey: 'user_id',
      as: 'todos',
      onDelete: 'CASCADE',
    })
  };

  return User;
};