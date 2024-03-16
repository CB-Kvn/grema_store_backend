import express from "express";
import { isValidated, validateTokenMiddleware } from "../middlewares/validators/validators";
import { Categories } from "../services/category.endpoint";

export const router = express.Router()
const endpoint = new Categories()

router.all('/create-category', endpoint.createCategories)
router.all('/modify-category', endpoint.updateStatusCategory)
