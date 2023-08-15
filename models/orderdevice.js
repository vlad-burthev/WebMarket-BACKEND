'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDevice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderDevice.init({
    deviceId: DataTypes.INTEGER,
    deviceSlug: DataTypes.STRING,
    deviceName: DataTypes.STRING,
    devicePrice: DataTypes.INTEGER,
    deviceImg: DataTypes.STRING,
    deviceTypeId: DataTypes.INTEGER,
    deviceBrandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderDevice',
  });
  return OrderDevice;
};