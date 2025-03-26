import { pool } from "../config/database.js"
import { hash } from "bcrypt"

//internal only function, used for comparing passwords
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

// SELECT u.username, p.*
// FROM users AS u
// JOIN user_profiles AS p ON p.user_id = u.id;

//used for returning profile info to the user (no hashed password)
export const getProfileByUsername = async (username) => {
  try {
    let params = [username]
    const [rows, fields] = await pool.query("SELECT u.id, u.username, u.type, p.* FROM users AS u JOIN user_profiles AS p ON p.user_id = u.id WHERE u.username = ?", params)
    if (rows.length == 0) { return false }
    return rows[0]
  } catch (err) {
    console.log(err)
  }
  return false
}

//same result as above
export const getProfileById = async (id) => {
  try {
    let params = [id]
    const [rows, fields] = await pool.query("SELECT u.id, u.username, u.type, p.* FROM users AS u JOIN user_profiles AS p ON p.user_id = u.id WHERE u.id = ?", params)
    if (rows.length == 0) { return false }
    return rows[0]
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
  } catch (err) { //duplicate entry should be detected before this function is called
    console.log(err)
    return false
  }
}

export const getAllUsers = async () => {
  try {
    const [rows, fields] = await pool.query("SELECT id, username, type FROM users")
    return rows
  } catch (err) {
    console.log(err)
  }
  return false
}

