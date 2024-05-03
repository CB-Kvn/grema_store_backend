import express from "express";
import { ShoppingCar } from "../services/shoppingCar.endpoint";


export const router = express.Router()
const endpoint = new ShoppingCar()

router.all('/add-shopping', endpoint.addShopping)
router.all('/remove-shopping',endpoint.removeShopping)