import { pool } from "../config/database.js"

export async function getAllFood() {
  try {
    const [rows, fields] = await pool.query("SELECT f.id, f.name_en, f.count, f.max_per_person, f.name_fr, ft.id AS food_type_id, ft.name_en AS food_type_en, ft.name_fr AS food_type_fr, dp.id AS dietary_preference_id, dp.name_en AS dietary_preference_en, dp.name_fr AS dietary_preference_fr, cp.id AS cultural_preference_id, cp.name_en AS cultural_preference_en, cp.name_fr AS cultural_preference_fr FROM food_items f LEFT JOIN food_type ft ON f.food_type = ft.id LEFT JOIN dietary_preferences dp ON f.dietary_preferences = dp.id LEFT JOIN cultural_preferences cp ON f.cultural_preferences = cp.id")
    return rows
  } catch (err) {
    return err
  }
}

export async function getFoodItemById(id) {
  try {
    let params = [id]
    const [rows, fields] = await pool.execute("SELECT f.id, f.name_en, f.count, f.max_per_person, f.name_fr, ft.id AS food_type_id, ft.name_en AS food_type_en, ft.name_fr AS food_type_fr, dp.id AS dietary_preference_id, dp.name_en AS dietary_preference_en, dp.name_fr AS dietary_preference_fr, cp.id AS cultural_preference_id, cp.name_en AS cultural_preference_en, cp.name_fr AS cultural_preference_fr FROM food_items f LEFT JOIN food_type ft ON f.food_type = ft.id LEFT JOIN dietary_preferences dp ON f.dietary_preferences = dp.id LEFT JOIN cultural_preferences cp ON f.cultural_preferences = cp.id WHERE f.id = ?", params)
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
    return await getFoodItemById(res[0].insertId)
  } catch (err) {
    switch (err.errno) {
      case 1062:
        return `The food item "${name}" already exists`
    }
    return err
  }
}

export async function deleteFoodItemById(id) {
  try {
    let params = [id]
    const res = await pool.execute("DELETE FROM food_items WHERE id = ?", params)
    let rows = res[0].affectedRows
    return `Affected rows: ${rows}`
  } catch (err) {
    return err
  }
}

export async function editFoodItemById(id, name, name_fr, qty, max_per_person, dietary_preferences, cultural_preferences, food_type) {
  try {
    let params = [name, name_fr, qty, max_per_person, dietary_preferences, cultural_preferences, food_type, id]
    console.log(params);
    const res = await pool.execute("UPDATE food_items SET name_en = ?, name_fr = ?, count = ?, max_per_person = ?, dietary_preferences = ?, cultural_preferences = ?, food_type = ? WHERE id = ?", params)
    let rows = res[0].affectedRows
    return await getFoodItemById(id)
  } catch (err) {
    return err
  }
}