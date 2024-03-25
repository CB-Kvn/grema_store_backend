import express from "express";
import { Filters } from "../services/filters.endpoint";

export const router = express.Router()
const endpoint = new Filters()

router.all('/filters', endpoint.getAllFilters)
