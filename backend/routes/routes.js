import express from "express"
import { getItemById, getItems } from "../controllers/foodcontroller.js"
import { signUp, login, updateProfile, getProfile } from "../controllers/usercontroller.js"
import { getUsers, getUserById, deleteItemById, editItemById, addItem, getOrders, getStats, updateOrderStatus } from "../controllers/admincontroller.js"
import { createOrder, getUserOrders } from "../controllers/ordercontroller.js"
import { getAllMetadata } from "../controllers/metadatacontroller.js"
import { pool } from "../config/database.js";
import bcrypt from "bcrypt";

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
// router.put('/orders/:id', editOrder)
router.put('/orders/:id/status', updateOrderStatus)
router.get('/stats', getStats)

router.get('/metadata', getAllMetadata)

router.post("/password-reset-request", async (req, res) => {
    const { username } = req.body;
  
    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }
  
    try {
        const [users] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

  
      if (users.length === 0) {
        return res.status(404).json({ message: "User not found." });
      }
  
      res.status(200).json({ message: "User verified. Proceed to change password." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error." });
    }
  });

  router.post("/reset-password", async (req, res) => {
    const { username, newPassword } = req.body;
  
    if (!username || !newPassword) {
      return res.status(400).json({ message: "Username and new password are required." });
    }
  
    try {
      const [users] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
  
      if (users.length === 0) {
        return res.status(404).json({ message: "User not found." });
      }
  
      const hashed = await bcrypt.hash(newPassword, 10); // 🔐 securely hash password
  
      await pool.query(
        "UPDATE users SET hashedPassword = ? WHERE username = ?",
        [hashed, username]
      );
  
      res.status(200).json({ message: "Password updated successfully." });
    } catch (err) {
      console.error("Reset error:", err);
      res.status(500).json({ message: "Server error." });
    }
  });
  
  
  
  