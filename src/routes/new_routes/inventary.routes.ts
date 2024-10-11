import express from "express";
import multer from "multer";
import InventaryService from "../../../src/services/news_endpoint.ts/inventary.endpoint";
import InventaryController from "../../../src/controllers/news_controller/inventary.controller";
import { Request, Response } from 'express';
export const router = express.Router()
const service = new InventaryService();
const controller = new InventaryController(service)


router.get("/show-products-in-landing", (req, res) => controller.getProductsShowLanding(req, res))
router.get("/show-products-to-store", (req, res) => controller.getProductsToStore(req, res))
router.get("/show-product-details-to-store", (req, res) => controller.getProductsDetailsToStore(req, res))
