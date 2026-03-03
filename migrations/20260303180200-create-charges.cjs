"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("charges", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      appointment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "appointments",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },
      patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "patients",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },
      original_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      outstanding_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM("PENDING", "PARTIALLY_PAID", "PAID", "CANCELLED"),
        allowNull: false,
        defaultValue: "PENDING"
      },
      due_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("charges");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_charges_status";');
  }
};
