
import express from "express";
import SignService from "../../../src/services/news_endpoint.ts/sign.endpoint";
import SignController from "../../../src/controllers/news_controller/sign.controller";
import { uploadImgManager } from "../../../src/middlewares/upload/uploadToServiceCloud";
import { archivesManager } from "../../../src/middlewares/validators/multer";


export const router = express.Router()
const service = new SignService();
const controller = new SignController(service)


router.post("/new-users",archivesManager, uploadImgManager, (req, res) => controller.createNewUser(req, res))