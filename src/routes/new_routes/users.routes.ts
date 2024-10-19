import express from "express";
import UsersController from "../../../src/controllers/news_controller/user.controller";
import UsersService from "../../../src/services/news_endpoint.ts/users.endpoint";

export const router = express.Router()
const service = new UsersService();
const controller = new UsersController(service)


router.post("/user-information", (req, res) => controller.getUserInformation(req, res))
router.post('/verify-password', (req, res) => controller.verifyCurrentPassword(req, res));