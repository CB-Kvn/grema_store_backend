import express from "express";
import { isValidated, validateTokenMiddleware } from "../middlewares/validators/validators";
import { UsersEndpoint } from "../services/user.endpoint";
import { archivesManager } from "../middlewares/validators/multer";

export const router = express.Router()
const endpoint = new UsersEndpoint()

router.all('/get-user', isValidated, endpoint.getUser)
router.all('/create-user',archivesManager, endpoint.createNewUser)
router.all('/delete-user', isValidated, endpoint.deleteUser)

router.all('/update-profile', endpoint.updateProfile)
router.all('/reset-profile-password', endpoint.updateProfilePassword)
router.all('/verify-password', endpoint.verifyPassword)


router.post('/loggin-user',isValidated, endpoint.loginUser)
router.post('/loggin-user-guest', endpoint.loginGuest)
router.post('/loggin-user-guest-refresh', endpoint.refreshGuestToken)