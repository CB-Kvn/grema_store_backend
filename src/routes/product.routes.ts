import express from "express";
import { isValidated, validateTokenMiddleware } from "../middlewares/validators/validators";
import { Product } from "../services/product.endpoint";
import multer from "multer";

export const router = express.Router()
const endpoint = new Product()

router.all('/create-product', endpoint.createProduct)
router.all('/modify-product', endpoint.updateProduct)
router.all('/get-all-filters', endpoint.getAllFilters)
router.all('/inventory/:id', endpoint.getUniqueProduct)
router.all('/show-products',endpoint.getShowProducts)

