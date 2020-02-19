'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Users',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Users',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      }
    );
  }
};
