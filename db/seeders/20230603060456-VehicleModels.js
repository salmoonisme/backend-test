"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fields = [
      {
        name: "Innova",
        typeID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fortuner",
        typeID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Land Cruiser",
        typeID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "C300 AMG Line",
        typeID: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "E250 AMG Line",
        typeID: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jazz",
        typeID: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Brio",
        typeID: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Palisade",
        typeID: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Santa Fe",
        typeID: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    return queryInterface.bulkInsert("VehicleModels", fields, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("VehicleModels", null, {});
  },
};
