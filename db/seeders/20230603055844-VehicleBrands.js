"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fields = [
      {
        name: "Toyota",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mercedes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Honda",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hyundai",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    return queryInterface.bulkInsert("VehicleBrands", fields, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("VehicleBrands", null, {});
  },
};
