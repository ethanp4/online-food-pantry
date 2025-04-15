import { pool } from "../config/database.js"

export async function getAllOrders() {
  try {
    const [rows, fields] = await pool.query("SELECT o.*, u.first_name, u.last_name FROM orders o JOIN user_profiles u ON o.user_id = u.user_id")
    console.log(rows)
    return rows
  } catch (err) {
    console.log(err)
    return err
  }
}

export async function getOrdersByUserId(user_id) {
  try {
    let params = [user_id]
    const [rows, fields] = await pool.query("SELECT * FROM orders WHERE user_id = ?", params)
    if (rows.length == 0) { return [] }
    return rows
  } catch (err) {
    console.log(err)
  }
  return false
}

export async function getOrderById(id) {
  try {
    let params = [id]
    const [rows, fields] = await pool.query("SELECT * FROM orders WHERE id = ?", params)
    if (rows.length == 0) { return false }
    return rows[0]
  } catch (err) {
    console.log(err)
  }
  return false
}

export async function addOrder(user_id, items, type, delivery_time, address) {
  //delivery time and address are only for delivery orders
  try {
    let params = [user_id, JSON.stringify(items), type, delivery_time, address]
    const res = await pool.execute("INSERT INTO orders (user_id, items, type, delivery_time, address) VALUES(?, ?, ?, ?, ?)", params)
    let rows = res[0].affectedRows
    return await getOrderById(res[0].insertId)
  } catch (err) {
    switch (err.errno) {
      case 1062:
        return `The order already exists`
    }
    return err
  }
}

export async function deleteOrderById(id) {
  try {
    let params = [id]
    const res = await pool.execute("DELETE FROM orders WHERE id = ?", params)
    let rows = res[0].affectedRows
    return `Affected rows: ${rows}`
  } catch (err) {
    return err
  }
}

export async function editOrderById(id, user_id, items, type, delivery_time, address) {
  //delivery time and address are only for delivery orders
  try {
    let params = [user_id, items, type, delivery_time, address, id]
    const res = await pool.execute("UPDATE orders SET user_id = ?, items = ?, type = ?, delivery_time = ?, address = ? WHERE id = ?", params)
    let rows = res[0].affectedRows
    return await getOrderById(id)
  } catch (err) {
    return err
  }
}

export async function editOrderStatus(id, status) {
  try {
    let params = [status, id]
    const res = await pool.execute("UPDATE orders SET status = ? WHERE id = ?", params)
    let rows = res[0].affectedRows
    return await getOrderById(id)
  } catch (err) {
    return err
  }
}