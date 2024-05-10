import { Request, Response } from "express";
import ProductModel from "../models/product.js";
import OrderModel from "../models/order.js";
import UserModel from "../models/user.js";
import "dotenv/config";

const placeOrderHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { retailerId, manId, prodName, quantity } = req.body;

    if (!prodName || !quantity || !retailerId || !manId)
      res.status(500).json({
        success: false,
        message: "please fill all the fields",
      });

    const product = await ProductModel.findOne({
      name: prodName.toLowerCase(),
    });

    if (!product) {
      res.status(400).json({
        success: false,
        message: "product not found",
      });
    }

    const newOrder = await OrderModel.create({
      retailer: retailerId,
      manufacturer: manId,
      orderDetails: product._id,
    });

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getInventoryStatusHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    const searchUser = await UserModel.findById(userId);

    if (!searchUser) {
      res.status(400).json({
        succcess: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "inventory fetched successfully",
      data: searchUser.populate("inventory"),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrdersReceivedHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    const searchUser = await UserModel.findById(userId);

    if (!searchUser) {
      res.status(400).json({
        succcess: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "orders fetched successfully",
      data: searchUser.populate("orders"),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrdersAcceptedHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    const searchUser = await UserModel.findById(userId);

    if (!searchUser) {
      res.status(400).json({
        succcess: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "accepted orders fetched successfully",
      data: searchUser.populate("acceptedOrders"),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// const acceptOrderHandler = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { orderId } = req.params;

//   } catch (error) {}
// };

export {
  placeOrderHandler,
  getInventoryStatusHandler,
  getOrdersReceivedHandler,
  getOrdersAcceptedHandler,
};
