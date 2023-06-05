'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const fields = [{
      email: "userbiasa@email.com",
      password: await bcrypt.hash('12345', 10),
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: "adminbiasa@email.com",
      password: await bcrypt.hash('12345', 10),
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]
    return queryInterface.bulkInsert('Users', fields, {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
