import express from "express";

import { validateTokenMiddleware } from "../middlewares/validators/validators";
import { Orders } from "../services/orders.endpoints";
import { archivesManager } from "../middlewares/validators/multer";
import { SendEmail } from "../services/sendEmail.endpoint";

export const router = express.Router()
const endpoint = new Orders()
const endpoint2 = new SendEmail()

router.all('/orders-in', endpoint.Orders)
router.all('/confirmation-order',archivesManager, endpoint.confirmationOrder)