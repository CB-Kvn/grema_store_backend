import express from "express";

import { validateTokenMiddleware } from "../middlewares/validators/validators";
import { Orders } from "../services/orders.endpoints";

export const router = express.Router()
const endpoint = new Orders()

router.all('/orders', endpoint.Orders)