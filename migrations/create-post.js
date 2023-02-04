"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      decription: {
        type: Sequelize.STRING,
      },
      post_title: {
        type: Sequelize.STRING,
      },
      time_start: {
        type: Sequelize.DATEONLY,
      },
      time_end: {
        type: Sequelize.DATEONLY,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["active", "pending", "deleted"],
      },
      createdAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Posts");
  },
};
