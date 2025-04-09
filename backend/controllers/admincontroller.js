import { addFoodRow, deleteFoodItemById, editFoodItemById, getFoodItemById } from "../model/foodmodel.js"
import { getAllOrders } from "../model/ordermodel.js"
import { getAllUsers } from "../model/usermodel.js"
import pkg from 'jsonwebtoken'
const { verify } = pkg

const accessSecret = process.env.ACCESS_TOKEN_SECRET

export const getUsers = async (req, res) => {
  const accessToken = req.headers.authorization
  if (!accessToken) { return res.status(500).json({ message: "Unauthorized" }) }
  try {
    const { type } = verify(accessToken, accessSecret)
    if (type !== "admin") { return res.status(500).json({ message: "Unauthorized" }) }
    const users = await getAllUsers()
    res.json(users)
  } catch (err) {
    console.log(err.name)
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized" })
    } else {
      return res.status(500).json({ message: "Failed to get users" })
    }
  }

}

export const getUserById = async (req, res) => {
  const accessToken = req.headers.authorization
  if (!accessToken) { return res.status(500).json({ message: "Unauthorized" }) }
  try {
    const { type } = verify(accessToken, accessSecret)
    if (type !== "admin") { return res.status(500).json({ message: "Unauthorized" }) }
    const userId = req.params.id
    const user = await getUserById(userId)
    res.json(user)
  } catch (err) {
    console.log(err.name)
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized" })
    } else {
      return res.status(500).json({ message: "Failed to get user" })
    }
  }
}

export const deleteItemById = async (req, res) => {
  const accessToken = req.headers.authorization
  if (!accessToken) { return res.status(500).json({ message: "Unauthorized" }) }
  try {
    const { type } = verify(accessToken, accessSecret)
    if (type !== "admin") { return res.status(500).json({ message: "Unauthorized" }) }
    const itemId = req.params.id
    const result = await deleteFoodItemById(itemId)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ message: "Failed to delete item" })
  }
}

export const editItemById = async (req, res) => {
  const accessToken = req.headers.authorization
  if (!accessToken) { return res.status(500).json({ message: "Unauthorized" }) }
  try {
    const { type } = verify(accessToken, accessSecret)
    if (type !== "admin") { return res.status(500).json({ message: "Unauthorized" }) }
    const itemId = req.params.id
    const item = await getFoodItemById(itemId)
    const name = req.body.name ? req.body.name : item.name
    const qty = req.body.count ? req.body.count : item.count
    const max_per_person = req.body.max_per_person ? req.body.max_per_person : item.max_per_person
    const cultural_preferences = req.body.cultural_preferences ? req.body.cultural_preferences : item.cultural_preferences
    const dietary_preferences = req.body.dietary_preferences ? req.body.dietary_preferences : item.dietary_preferences
    const food_type = req.body.food_type ? req.body.food_type : item.food_type

    const result = await editFoodItemById(itemId, name, qty, max_per_person, dietary_preferences, cultural_preferences, food_type)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ message: "Failed to edit item" })
  }
}

export const addItem = async (req, res) => {
  const accessToken = req.headers.authorization
  if (!accessToken) { return res.status(500).json({ message: "Unauthorized" }) }
  try {
    const { type } = verify(accessToken, accessSecret)
    if (type !== "admin") { return res.status(500).json({ message: "Unauthorized" }) }
    let name = req.body.name
    let qty = req.body.quantity
    let max_per_person = req.body.max_per_person
    if (name == null || qty == null) {
      res.status(500).json({error: "Either name or quantity are missing"})
    }
    if (parseInt(qty) < 0) {
      res.status(500).json({error: "Quantity must not be negative"})
    }
    const result = await addFoodRow(name, qty, max_per_person);
    res.json(result);
  } catch (err) {
    console.log(err)
  }
}

//admin route to get every order if the right token is provided
export const getOrders = async (req, res) => {
  const accessToken = req.headers.authorization
  if (!accessToken) { return res.status(500).json({ message: "Unauthorized" }) }
  try {
    const { type } = verify(accessToken, accessSecret)
    if (type !== "admin") { return res.status(500).json({ message: "Unauthorized" }) }
    const orders = await getAllOrders()
    res.status(200).json( { message: "Successfully retrieved orders", orders })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to get orders" })
  }
}