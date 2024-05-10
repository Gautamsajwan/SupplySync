import { Request, Response } from "express";
import "dotenv/config";
import UserModel from "../models/user.js";
import ProductModel from "../models/product.js";
import IdealConditionModel from "../models/idealConditions.js";

const getManufacturerHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const manufacturers = await UserModel.find({ role: "manufacturer" });
    res.status(200).json({
      success: true,
      data: manufacturers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addProductHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      prodName,
      quantity,
      expDate,
      temperature,
      humidity,
      shock,
      pressure,
    } = req.body;

    const result = await IdealConditionModel.create({
      temperature,
      humidity,
      shock,
      pressure,
    });

    const product = await ProductModel.create({
      name: prodName,
      quantity,
      expDate,
      idealConditions: result._id,
    });

    res.status(200).json({
      success: true,
      messaage: "Order placed successfully",
      productDetails: product,
      idealConditions: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.messaage,
    });
  }
};

export { getManufacturerHandler, addProductHandler };
