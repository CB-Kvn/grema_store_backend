import express from "express";
import CarrierController from "../../../src/controllers/news_controller/carrier.controller";
import CarrierService from "../../../src/services/news_endpoint.ts/carrier.endpoint";
export const router = express.Router()
const service = new CarrierService();
const controller = new CarrierController(service)


router.get("/prices-send", (req, res) => controller.getPriceCarrier(req, res))
