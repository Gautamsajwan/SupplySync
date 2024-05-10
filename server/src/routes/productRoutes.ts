import express from 'express'
import 'dotenv/config'
import { getManufacturerHandler, addProductHandler } from '../controllers/Buisness.js'
import { getInventoryStatusHandler, getOrdersAcceptedHandler, getOrdersReceivedHandler, placeOrderHandler } from '../controllers/Order.js'
const router = express.Router()

router.get('/getManufacturers', getManufacturerHandler)

router.get("/inventoryStatus/:userId", getInventoryStatusHandler)

router.post("/addProduct", addProductHandler)

router.get("/ordersReceived/:userId", getOrdersReceivedHandler)

router.get("/ordersAccepted/:userId", getOrdersAcceptedHandler)

// router.post('/acceptOrder', acceptOrderHandler)

router.post('/placeOrder', placeOrderHandler)

export default router