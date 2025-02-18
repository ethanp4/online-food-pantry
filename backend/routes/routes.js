import express from "express"
import { test } from "../controllers/test.js"
import { addFoodItem, getFood } from "../controllers/foodcontroller.js"

export const router = express.Router()

router.get('/test', test)
router.get('/food', getFood)
router.post('/addItem', addFoodItem)
