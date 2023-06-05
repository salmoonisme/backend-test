"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fields = [
      {
        name: "SUV",
        brandID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sedan",
        brandID: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hatchback",
        brandID: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "SUV",
        brandID: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    return queryInterface.bulkInsert("VehicleTypes", fields, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("VehicleTypes", null, {});
  },
};
