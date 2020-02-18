'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    "Todos",
    [
      {
        user_id: 1,
        title: "hispotan dennu ne",
        description: "Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.",
        id_status: 1,
        due_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        user_id: 2,
        title: 'some dummy title',
        description:
          "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
        id_status: 2,
        due_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Todos", null, {}),
};
