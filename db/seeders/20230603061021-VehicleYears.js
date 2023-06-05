"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fields = [
      {
        year: "2017",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        year: "2018",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        year: "2019",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        year: "2020",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        year: "2021",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        year: "2022",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert("VehicleYears", fields, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("VehicleYears", null, {});
  },
};
