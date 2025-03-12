import express from "express"
import { addItem, getItemById, getItems } from "../controllers/foodcontroller.js"
import { signUp, login, updateProfile, getProfile } from "../controllers/usercontroller.js"
import { getUsers, getUserById, addUser, deleteItemById, editItemById } from "../controllers/admincontroller.js"

export const router = express.Router()


//item related
router.get('/item', getItems)
router.get('/item/:id', getItemById)
router.post('/addItem', addItem)

// requires keys username, password, email
router.post('/signup', signUp) //sign up with basic details (username, password)
// requires keys username, password
router.post('/login', login) //authenticate with same basic details

//requires authentication header
router.get('/profile', getProfile)
router.post('/updateProfile', updateProfile) //update one or multiple values related to a users profile


//administrator actions, requires admin authentication header
router.get('/getUsers', getUsers)
router.get('/getUserById', getUserById)
router.post('/addUser', addUser)
router.delete('/deleteItem/:id', deleteItemById)
router.post('/editItem/:id', editItemById)
