import { DataTypes } from "sequelize";
import sequelize from "../db.js";

export const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  firstName: { type: DataTypes.STRING(15), allowNull: false },
  lastName: { type: DataTypes.STRING(15), allowNull: false },
  phoneNumber: { type: DataTypes.STRING(15), allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: "USER" },
});

export const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  //userId
});

export const BasketDevice = sequelize.define("basket_device", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  //basketId
  deviceId: { type: DataTypes.INTEGER, allowNull: false },
  deviceSlug: { type: DataTypes.STRING, allowNull: false },
  deviceName: { type: DataTypes.STRING, allowNull: false },
  devicePrice: { type: DataTypes.INTEGER, allowNull: false },
  deviceImg: { type: DataTypes.STRING, allowNull: false },
  deviceTypeId: { type: DataTypes.INTEGER, allowNull: false },
  deviceBrandId: { type: DataTypes.INTEGER, allowNull: false },
});

export const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

export const OrderDevice = sequelize.define("order_device", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  //orderId
  deviceId: { type: DataTypes.INTEGER, allowNull: false },
  deviceSlug: { type: DataTypes.STRING, allowNull: false },
  deviceName: { type: DataTypes.STRING, allowNull: false },
  devicePrice: { type: DataTypes.INTEGER, allowNull: false },
  deviceImg: { type: DataTypes.STRING, allowNull: false },
  deviceTypeId: { type: DataTypes.INTEGER, allowNull: false },
  deviceBrandId: { type: DataTypes.INTEGER, allowNull: false },
});

export const Device = sequelize.define("device", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  price: { type: DataTypes.INTEGER, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false, unique: true },
  brandId: { type: DataTypes.INTEGER, allowNull: false },
  typeId: { type: DataTypes.INTEGER, allowNull: false },
});

export const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  rate: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  //deviceId
});

export const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(30), allowNull: false, unique: true },
});

export const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(30), allowNull: false, unique: true },
});

export const DeviceInfo = sequelize.define("device_info", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

export const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// Связь между Device и Rating
Device.hasMany(Rating, { foreignKey: "deviceId" });
Rating.belongsTo(Device, { foreignKey: "deviceId" });

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasOne(Order);
Order.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice, { as: "basket_device" });
BasketDevice.belongsTo(Basket);

Order.hasMany(OrderDevice, { as: "order_device" });
OrderDevice.belongsTo(Order);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(OrderDevice);
OrderDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: "info" });
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

export const models = {
  Device,
  Order,
  OrderDevice,
  Basket,
  BasketDevice,
  DeviceInfo,
  User,
  Rating,
  TypeBrand,
  Brand,
  Type,
};
