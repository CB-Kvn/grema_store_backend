import express from "express";
import { Filters } from "../services/filters.endpoint";
import { validateTokenMiddleware } from "../middlewares/validators/validators";

export const router = express.Router()
const endpoint = new Filters()

router.all('/filters', endpoint.getAllFilters)
