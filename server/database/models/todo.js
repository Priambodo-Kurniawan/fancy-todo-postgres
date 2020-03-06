'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;
  class Todo extends Model {};

  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3],
          msg: 'Title length minimal 3 character'
        }
      },
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
      validate: {
        dateMoreThanNow(value) {
          if (value < Date.now()) {
            throw new Error('Due date is more than now! ' + value);
          }
        }
      }
    },
    created_at: { 
      type: DataTypes.DATE
    },
    updated_at: { 
      type: DataTypes.DATE
    }
  }, {
    sequelize
  });

  Todo.associate = (models) => {
    Todo.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'author',
      onDelete: 'CASCADE',
    })
  };
  return Todo;
};