import express from "express";
import { SendEmail } from "../services/sendEmail.endpoint";

export const router = express.Router()
const endpoint = new SendEmail()

router.all('/email-confirmation', endpoint.sendEmail)


