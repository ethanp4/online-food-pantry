import { pool } from "../config/database.js"

export async function getAllFood() {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM food_items")
    return rows
  } catch (err) {
    return err
  }
}

export async function getFoodItemById(id) {
  try {
    let params = [id]
    const [rows, fields] = await pool.execute("SELECT * FROM food_items WHERE id = ?", params)
    if (rows.length == 0) { return false }
    return rows[0]
  } catch (err) {
    console.log(err)
  }
  return false
}

export async function addFoodRow(name, qty) {
  try {
    let params = [name, qty]
    const res = await pool.execute("INSERT INTO food_items (name, count) VALUES(?, ?)", params)
    let rows = res[0].affectedRows
    return `Affected rows: ${rows}`
  } catch (err) {
    switch (err.errno) {
      case 1062:
        return `The food item "${name}" already exists`
    }
    return err
  }
}