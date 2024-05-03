import express from "express";
import { isValidated, validateTokenMiddleware } from "../middlewares/validators/validators";
import { Categories } from "../services/category.endpoint";
import { Favorities } from "../services/favorities.endpoint";

export const router = express.Router()
const endpoint = new Favorities()

router.all('/add-favorities', endpoint.addFavorities)
router.all('/remove-favorities',endpoint.removeFavorities)