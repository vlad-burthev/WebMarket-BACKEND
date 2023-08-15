"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("basket_devices", "deviceName", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false, // Убрать ограничение уникальности
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("basket_devices", "deviceName", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // Вернуть ограничение уникальности, если необходимо
    });
  },
};
