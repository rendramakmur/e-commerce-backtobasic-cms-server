'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [
     {
       full_name: 'administrator',
       email: 'admin@mail.com',
       password: bcrypt.hashSync('123456', 10),
       role: 'admin',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      full_name: 'customer',
      email: 'customer@mail.com',
      password: bcrypt.hashSync('123456', 10),
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
