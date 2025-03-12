import { addFoodRow } from "../model/foodmodel.js"
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

export const addUser = async (req, res) => {
  
}

export const deleteItemById = async (req, res) => {

}

export const editItemById = async (req, res) => {
  
}

export const addItem = async (req, res) => {
  try {
    let name = req.body.name
    let qty = req.body.quantity
    if (name == null || qty == null) {
      res.status(500).json({error: "Either name or quantity are missing"})
    }
    if (parseInt(qty) < 0) {
      res.status(500).json({error: "Quantity must not be negative"})
    }
    const result = await addFoodRow(name, qty);
    res.json(result);
  } catch (err) {
    console.log(err)
  }
}