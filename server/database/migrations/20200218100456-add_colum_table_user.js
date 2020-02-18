'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'password',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'Users',
        'social_login',
        {
          type: Sequelize.BOOLEAN
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'password'),
      queryInterface.removeColumn('Users', 'social_login')
    ]);
  }
};
