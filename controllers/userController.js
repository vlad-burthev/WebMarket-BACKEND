import { configDotenv } from "dotenv";
import { Basket, Order, User } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

configDotenv();

const generateJwt = (id, email, role, phoneNumber, firstName, lastName) => {
  return jwt.sign(
    { id, email, role, phoneNumber, firstName, lastName },
    process.env.SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });

  if (!existingUser) {
    return res.json({ message: "Такого пользователя не существует" });
  }

  let comparePassword = bcrypt.compareSync(password, existingUser.password);
  if (!comparePassword) {
    return res.json({ message: "Неверный пароль или email" });
  }

  const token = generateJwt(
    existingUser.id,
    email,
    existingUser.phoneNumber,
    existingUser.firstName,
    existingUser.lastName,
    existingUser.role
  );

  return res.json({ existingUser, token });
};

export const registration = async (req, res) => {
  try {
    const { email, phoneNumber, firstName, lastName, password, role } =
      req.body;

    const existingUser = await User.findOne({ where: { email, phoneNumber } });

    if (existingUser) {
      return res.json({
        message: "User with this email or phone will be register",
      });
    }

    let hashPassword = bcrypt.hashSync(password, 5);
    const createUser = await User.create({
      email,
      phoneNumber,
      firstName,
      lastName,
      password: hashPassword,
      role,
    });

    const createOrder = await Order.create({ userId: createUser.id });
    const createBasket = await Basket.create({ userId: createUser.id });

    const token = generateJwt(
      createUser.id,
      createUser.email,
      createUser.phoneNumber,
      createUser.firstName,
      createUser.lastName,
      createUser.role
    );

    return res.json({ token, createUser, createOrder, createBasket });
  } catch (error) {
    console.log(error);
  }
};
