import mysql from "mysql"
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE 
})

export const dbConnect = async () => {
  try {
    await pool.getConnection()
    console.log("Database connected")
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

export const query = async (sql, params) => {
  const [results] = await pool.execute(sql, params)
  return results
}
