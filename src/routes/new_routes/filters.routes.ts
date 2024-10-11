import express from "express";
import FiltersService from "../../../src/services/news_endpoint.ts/filters.endpoint";
import FiltersController from "../../../src/controllers/news_controller/filters.controller";
export const router = express.Router()
const service = new FiltersService();
const controller = new FiltersController(service)


router.get("/filters-store", (req, res) => controller.getFiltersStore(req, res))
