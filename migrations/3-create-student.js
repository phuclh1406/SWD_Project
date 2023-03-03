"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Students", {
      student_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      student_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // password: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },
      // birthday: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },
      avatar: {
        type: Sequelize.STRING(500),
      },
      portfolio: {
        type: Sequelize.STRING
      },
      // address: {
      //   type: Sequelize.STRING,
      // },
      // phone: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },
      refresh_token: {
        type: Sequelize.STRING,
      },
      role_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: 'roles',
          key: 'role_id'
        }
      },
      major_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: 'majors',
          key: 'major_id'
        }
      },
      status: {
        type: Sequelize.ENUM,
        values: ["Active", "Deactive"],
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
    await queryInterface.dropTable("Students");
  },
};
