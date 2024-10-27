import express from "express";
import TiloPayService from "../../../src/services/news_endpoint.ts/tilopay.endpoint";
import TiloPayController from "../../../src/controllers/news_controller/tilopay.controller";


export const router = express.Router()
const service = new TiloPayService();
const controller = new TiloPayController(service)


router.post("/tilo-pay", (req, res) => controller.getPriceCarrier(req, res))