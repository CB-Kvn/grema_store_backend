import express from "express";
import multer from "multer";
import InventaryService from "../../../src/services/news_endpoint.ts/inventary.endpoint";
import InventaryController from "../../../src/controllers/news_controller/inventary.controller";
import { Request, Response } from 'express';
import { uploadImgManager } from "../../../src/middlewares/upload/uploadToServiceCloud";
import { archivesManager } from "../../../src/middlewares/validators/multer";

export const router = express.Router()
const service = new InventaryService();
const controller = new InventaryController(service)


router.get("/show-products-in-landing", (req, res) => controller.getProductsShowLanding(req, res))
router.get("/show-products-to-store", (req, res) => controller.getProductsToStore(req, res))
router.get("/show-product-details-to-store", (req, res) => controller.getProductsDetailsToStore(req, res))
router.post("/add-products",archivesManager,uploadImgManager, (req, res) => controller.postAddProducts(req, res))
router.get("/search", (req, res) =>controller.searchProducts(req, res)); // Búsqueda de productos
router.get("/top-selling",(req, res) => controller.getTopSellingProducts(req, res)); // Productos más vendidos
router.get("/discounted",(req, res) => controller.getDiscountedProducts(req, res)); // Productos con descuento
router.get("/related/:productId",(req, res) => controller.getRelatedProducts(req, res)); // Productos relacionados
router.get("/new",(req, res) => controller.getNewProducts(req, res)); // Productos nuevos