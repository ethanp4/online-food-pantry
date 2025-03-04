import { pool } from "../config/database.js"

//internal only function
export const getUserByUsername = async (username) => {
  try {
    let params = [username]
    const [rows, fields] = await pool.query("SELECT * FROM users WHERE username = ?", params)
    if (rows.length == 0) { return false }
    return rows
  } catch (err) {
    console.log(err)
  }
  return false  
}

export const createUser = async (username, hashedPassword, email, type) => {
  try {
    let params = [username, hashedPassword, email, type]
    const res = await pool.execute("INSERT INTO users (username, hashedPassword, email, type) VALUES(?, ?, ?, ?)", params)
    let rows = res[0].affectedRows
    return `Affected rows: ${rows}`
  } catch (err) { //this type of error should be detected before this function is called
    switch (err.errno) {
      case 1062:
        return `User already exists`
    }
    return err
  }
} 