import express from "express";
import LoginController from "../../../src/controllers/news_controller/login.controller";
import LoginService from "../../../src/services/news_endpoint.ts/login.enpoints";
import { verifyTokenJwt } from "../../../src/middlewares/tokens/verify_token";

export const router = express.Router()
const service = new LoginService();
const controller = new LoginController(service)


router.post("/login", (req, res) => controller.login(req, res))

router.post("/refresh-token", (req, res) => controller.refresh(req, res))

router.post("/dashboard",verifyTokenJwt, (req, res) => controller.dashboard(req, res))
