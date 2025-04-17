import { addFoodRow, deleteFoodItemById, editFoodItemById, getAllFood, getFoodItemById } from "../model/foodmodel.js"
import { editOrderById, editOrderStatus, getAllOrders } from "../model/ordermodel.js"
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
    const name = req.body.name_en ? req.body.name_en : null
    const name_fr = req.body.name_fr ? req.body.name_fr : null
    const qty = req.body.count ? req.body.count : null
    const max_per_person = req.body.max_per_person ? req.body.max_per_person : null
    const cultural_preference_id = req.body.cultural_preference_id ? req.body.cultural_preference_id : null
    const dietary_preference_id = req.body.dietary_preference_id ? req.body.dietary_preference_id : null
    const food_type_id = req.body.food_type_id ? req.body.food_type_id : null
    console.log(req.body);
    const result = await editFoodItemById(itemId, name, name_fr, qty, max_per_person, dietary_preference_id, cultural_preference_id, food_type_id)
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

export const getStats = async (req, res) => {
  const accessToken = req.headers.authorization
  if (!accessToken) { return res.status(500).json({ message: "Unauthorized" }) }
  try {
    const { type } = verify(accessToken, accessSecret)
    if (type !== "admin") { return res.status(500).json({ message: "Unauthorized" }) }
    const users = await getAllUsers()
    const orders = await getAllOrders()
    const items = await getAllFood()
    let time = null
    if (orders.length !== 0) {
      time = new Date(orders[orders.length - 1].time_created)
    }
    res.status(200).json({ 
      totalUsers: users.length, 
      totalItems: items.length, 
      totalPendingOrders: orders.filter(order => order.status === "pending").length, 
      mostRecentOrder: time ? time.toLocaleString() : null
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to get stats" })
  }
}

export const updateOrderStatus = async (req, res) => {
  const accessToken = req.headers.authorization
  if (!accessToken) { return res.status(500).json({ message: "Unauthorized" }) }
  try {
    const { type } = verify(accessToken, accessSecret)
    if (type !== "admin") { return res.status(500).json({ message: "Unauthorized" }) }
    const orderId = req.params.id
    const status = req.body.status
    const updatedOrder = await editOrderStatus(orderId, status)
    res.status(200).json({ message: "Successfully updated order", order: updatedOrder })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to update order status" })
  }
}
