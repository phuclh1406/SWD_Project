"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Deliverables", {
      deliverable_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      url: {
        type: Sequelize.STRING,
      },
      apllication_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: 'applications',
          key: 'apllication_id'
        }
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Active', 'Deactive', 'Finished'],
        defaultValue: 'Active',
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
    await queryInterface.dropTable("Deliverables");
  },
};
