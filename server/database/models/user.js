'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    social_login: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo, {
      foreignKey: 'user_id',
      as: 'todos',
      onDelete: 'CASCADE',
    });
  };
  return User;
};