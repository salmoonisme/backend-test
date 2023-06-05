"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fields = [
      {
        yearID: 6,
        modelID: 1,
        price_inMillion: 499,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        yearID: 5,
        modelID: 2,
        price_inMillion: 649,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        yearID: 1,
        modelID: 3,
        price_inMillion: 2099,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        yearID: 1,
        modelID: 4,
        price_inMillion: 629,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        yearID: 2,
        modelID: 5,
        price_inMillion: 699,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        yearID: 3,
        modelID: 6,
        price_inMillion: 199,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        yearID: 1,
        modelID: 7,
        price_inMillion: 169,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        yearID: 5,
        modelID: 8,
        price_inMillion: 779,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        yearID: 4,
        modelID: 9,
        price_inMillion: 639,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert("Pricelists", fields, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Pricelists", null, {});
  },
};
