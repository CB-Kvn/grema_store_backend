import express from "express";
import { isValidated, validateTokenMiddleware } from "../middlewares/validators/validators";
import { Categories } from "../services/category.endpoint";

export const router = express.Router()
const endpoint = new Categories()

router.all('/create-product', endpoint.createCategories)
router.all('/modify-product', endpoint.updateStatusCategory)
