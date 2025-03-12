import { pool } from "../config/database.js"
import { hash } from "bcrypt"

//internal only function
export const getUserByUsername = async (username) => {
  try {
    let params = [username]
    const [rows, fields] = await pool.query("SELECT * FROM users WHERE username = ?", params)
    if (rows.length == 0) { return false }
    return rows[0]
  } catch (err) {
    console.log(err)
  }
  return false  
}

//used for returning profile info to the user (no hashed password)
export const getProfileByUsername = async (username) => {
  try {
    let params = [username]
    const [rows, fields] = await pool.query("SELECT * FROM users WHERE username = ?", params)
    if (rows.length == 0) { return false }
    let user = {
      id: rows[0].id,
      username: rows[0].username,
      type: rows[0].type
    }
    return user
  } catch (err) {
    console.log(err)
  }
  return false  
}

export const getProfileById = async (id) => {
  try {
    let params = [id]
    const [rows, fields] = await pool.query("SELECT * FROM users WHERE id = ?", params)
    if (rows.length == 0) { return false }
    let user = {
      id: rows[0].id,
      username: rows[0].username,
      type: rows[0].type
    }
    return user
  } catch (err) {
    console.log(err)
  }
  return false  
}

export const createUser = async (username, password, type) => {
  try {
    const hashedPassword = await hash(password, 10)
    let params = [username, hashedPassword, type]
    const res = await pool.execute("INSERT INTO users (username, hashedPassword, type) VALUES(?, ?, ?)", params)
    let newUser = await getUserByUsername(username)
    return newUser
  } catch (err) { //this type of error should be detected before this function is called
    console.log(err)
    return false
  }
} 

export const getAllUsers = async () => {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM users")
    return rows
  } catch (err) {
    console.log(err)
  }
  return false
}

