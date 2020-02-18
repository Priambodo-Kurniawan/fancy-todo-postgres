'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    description: { 
      type: DataTypes.TEXT
    },
    user_id: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_status: { 
      type: DataTypes.INTEGER
    },
    due_date: { 
      type: DataTypes.DATE,
    },
    created_at: { 
      type: DataTypes.DATE
    },
    updated_at: { 
      type: DataTypes.DATE
    }
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'author',
      onDelete: 'CASCADE',
    })
  };
  return Todo;
};