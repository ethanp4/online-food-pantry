import { pool } from "../config/database.js"

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

export const createUser = async (username, hashedPassword, type) => {
  try {
    let params = [username, hashedPassword, type]
    const res = await pool.execute("INSERT INTO users (username, hashedPassword, type) VALUES(?, ?, ?)", params)
    let newUser = await getUserByUsername(username)
    return newUser
  } catch (err) { //this type of error should be detected before this function is called
    console.log(err)
    return false
  }
} 