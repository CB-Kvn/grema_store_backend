import express from "express";

import { validateTokenMiddleware } from "../middlewares/validators/validators";
import { Orders } from "../services/orders.endpoints";
import { archivesManager } from "../middlewares/validators/multer";

export const router = express.Router()
const endpoint = new Orders()

router.all('/orders-in', endpoint.Orders)
router.all('/confirmation-order',archivesManager, endpoint.confirmationOrder)