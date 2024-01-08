import express from "express";
import { isValidated, validateTokenMiddleware } from "../middlewares/validators/validators";
import { UsersEndpoint } from "../services/user.endpoint";
import fileUpload from "express-fileupload";

export const router = express.Router()
const endpoint = new UsersEndpoint()

router.all('/get-user', isValidated, endpoint.getUser)
router.all('/create-user', isValidated,fileUpload({
    useTempFiles: true,
    tempFileDir: "./src/uploads",
}), endpoint.createNewUser)
router.all('/delete-user', isValidated, endpoint.deleteUser)

router.all('/reset-profile-email', isValidated, validateTokenMiddleware, endpoint.updateProfileEmail)
router.all('/reset-profile-password', isValidated, validateTokenMiddleware, endpoint.updateProfilePassword)

router.all('/loggin-user',isValidated, endpoint.loginUser)