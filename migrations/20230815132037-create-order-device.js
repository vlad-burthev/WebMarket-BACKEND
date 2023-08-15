'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderDevices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deviceId: {
        type: Sequelize.INTEGER
      },
      deviceSlug: {
        type: Sequelize.STRING
      },
      deviceName: {
        type: Sequelize.STRING
      },
      devicePrice: {
        type: Sequelize.INTEGER
      },
      deviceImg: {
        type: Sequelize.STRING
      },
      deviceTypeId: {
        type: Sequelize.INTEGER
      },
      deviceBrandId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderDevices');
  }
};