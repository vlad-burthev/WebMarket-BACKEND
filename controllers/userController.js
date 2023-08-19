import { configDotenv } from "dotenv";
import { Op } from "sequelize";

import { Basket, Order, User } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../error/ApiError.js";

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

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return next(ApiError.badRequest("This user does not exist"));
    }

    let comparePassword = bcrypt.compareSync(password, existingUser.password);
    if (!comparePassword) {
      return next(ApiError.badRequest("Incorrect password or email"));
    }

    const token = generateJwt(
      existingUser.id,
      email,
      existingUser.role,
      existingUser.phoneNumber,
      existingUser.firstName,
      existingUser.lastName
    );

    return res.status(200).json({ existingUser, token });
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const registration = async (req, res, next) => {
  try {
    const { email, phoneNumber, firstName, lastName, password, role } =
      req.body;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ phoneNumber }, { email }],
      },
    });

    if (existingUser) {
      return next(
        ApiError.badRequest("User with this email or phone will be register")
      );
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
      createUser.role,
      createUser.phoneNumber,
      createUser.firstName,
      createUser.lastName
    );

    return res
      .status(200)
      .json({ token, createUser, createOrder, createBasket });
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const check = (req, res) => {
  try {
    const token = generateJwt(
      req.user.id,
      req.user.email,
      req.user.role,
      req.user.phoneNumber,
      req.user.firstName,
      req.user.lastName
    );
    return res.status(200).json({ token });
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};
