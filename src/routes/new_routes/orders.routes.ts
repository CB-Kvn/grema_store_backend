import express from "express";
import OrdersService from "../../../src/services/news_endpoint.ts/orders.endpoint";
import OrdersController from "../../../src/controllers/news_controller/orders.constroller";


export const router = express.Router()
const service = new OrdersService();
const controller = new OrdersController(service)


router.post("/orders-in", (req, res) => controller.postOrders(req, res))
router.post("/orders-users", (req, res) => controller.getOrdersUsers(req, res))
router.get("/amount-month-year", (req, res) => controller.getAmountMonthYear(req, res))
router.post("/orders-week", (req, res) => controller.getOrdersUsersWeek(req, res))
router.post("/orders-month", (req, res) => controller.getOrdersUsersMonth(req, res))
router.post("/orders-year", (req, res) => controller.getOrdersUsersYear(req, res))




