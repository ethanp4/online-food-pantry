import { pool } from "../config/database.js"

export async function getAllFoodTypes() {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM food_type")
    return rows
  } catch (err) {
    return err
  }
}

export async function getAllDietaryPreferences() {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM dietary_preferences")
    return rows
  } catch (err) {
    return err
  }
}

export async function getAllCulturalPreferences() {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM cultural_preferences")
    return rows
  } catch (err) {
    return err
  }
}

export async function addFoodType(name_en, name_fr) {
  try {
    const [rows, fields] = await pool.query("INSERT INTO food_type (name_en, name_fr) VALUES (?, ?)", [name_en, name_fr])
    return rows
  } catch (err) {
    return err
  }
}

export async function addDietaryPreference(name_en, name_fr) {
  try {
    const [rows, fields] = await pool.query("INSERT INTO dietary_preferences (name_en, name_fr) VALUES (?, ?)", [name_en, name_fr])
    return rows
  } catch (err) {
    return err
  }
}

export async function addCulturalPreference(name_en, name_fr) {
  try {
    const [rows, fields] = await pool.query("INSERT INTO cultural_preferences (name_en, name_fr) VALUES (?, ?)", [name_en, name_fr])
    return rows
  } catch (err) {
    return err
  }
}

export async function deleteFoodType(id) {
  try {
    const [rows, fields] = await pool.query("DELETE FROM food_type WHERE id = ?", [id])
    return rows
  } catch (err) {
    return err
  }
}

export async function deleteDietaryPreference(id) {
  try {
    const [rows, fields] = await pool.query("DELETE FROM dietary_preferences WHERE id = ?", [id])
    return rows
  } catch (err) {
    return err
  }
}

export async function deleteCulturalPreference(id) {
  try {
    const [rows, fields] = await pool.query("DELETE FROM cultural_preferences WHERE id = ?", [id])
    return rows
  } catch (err) {
    return err
  }
}

export async function editFoodType(id, name_en, name_fr) {
  try {
    const [rows, fields] = await pool.query("UPDATE food_type SET name_en = ?, name_fr = ? WHERE id = ?", [name_en, name_fr, id])
    return rows
  } catch (err) {
    return err
  }
}

export async function editDietaryPreference(id, name_en, name_fr) {
  try {
    const [rows, fields] = await pool.query("UPDATE dietary_preferences SET name_en = ?, name_fr = ? WHERE id = ?", [name_en, name_fr, id])
    return rows
  } catch (err) {
    return err
  }
}

export async function editCulturalPreference(id, name_en, name_fr) {
  try {
    const [rows, fields] = await pool.query("UPDATE cultural_preferences SET name_en = ?, name_fr = ? WHERE id = ?", [name_en, name_fr, id])
    return rows
  } catch (err) {
    return err
  }
}
