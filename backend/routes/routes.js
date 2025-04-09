import express from "express"
import { getItemById, getItems } from "../controllers/foodcontroller.js"
import { signUp, login, updateProfile, getProfile } from "../controllers/usercontroller.js"
import { getUsers, getUserById, deleteItemById, editItemById, addItem, getOrders } from "../controllers/admincontroller.js"
import { createOrder, getUserOrders } from "../controllers/ordercontroller.js"

export const router = express.Router()

//item related
router.get('/item', getItems)
router.get('/item/:id', getItemById)

// requires keys username, password, enum(user, admin)
router.post('/register', signUp) //sign up with basic details (username, password)
// requires keys username, password
router.post('/login', login) //authenticate with same basic details


//get the profile associated with the token in the authorization header
router.get('/profile', getProfile)
router.post('/updateProfile', updateProfile) //update one or multiple values related to a users profile

//get orders associated with the token in the authorization header
router.get('/order', getUserOrders)
router.post('/order', createOrder)

//administrator actions, requires admin authorization header
router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.delete('/item/:id', deleteItemById)
router.put('/item/:id', editItemById)
router.post('/addItem', addItem)
router.get('/orders', getOrders)
