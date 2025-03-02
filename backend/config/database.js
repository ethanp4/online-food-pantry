import mysql from "mysql2/promise"
import dotenv from 'dotenv'

dotenv.config()

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  // connectionLimit: 10,
  queueLimit: 0
});

export const dbConnect = async () => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Connected to database as ${conn.config.user}@${conn.config.host} on port ${conn.config.port}`) 
    conn.release()
  })
}

