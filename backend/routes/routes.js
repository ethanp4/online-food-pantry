import express from "express"
import { addItem, getItems } from "../controllers/foodcontroller.js"
import { signUp, login, updateProfile } from "../controllers/usercontroller.js"

export const router = express.Router()


//item related
router.get('/item', getItems)
// router.get('/item/:id', getItemById)
router.post('/addItem', addItem)

// requires keys username, password, enum(user, admin)
router.post('/register', signUp) //sign up with basic details (username, password)
// requires keys username, password
router.post('/login', login) //authenticate with same basic details
router.post('/updateProfile', updateProfile) //update one or multiple values related to a users profile