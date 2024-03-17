import express from "express";
import { isValidated, validateTokenMiddleware } from "../middlewares/validators/validators";
import { Product } from "../services/product.endpoint";

export const router = express.Router()
const endpoint = new Product()

router.all('/create-product', endpoint.createProduct)
router.all('/modify-product', endpoint.updateProduct)
router.all('/modify-product-status', endpoint.updateProductStatus)
