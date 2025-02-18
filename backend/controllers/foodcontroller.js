import { getAllFood, addFoodRow } from "../model/foodmodel.js";

export async function getFood(req, res) {
  try {
    const food = await getAllFood();
    res.json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function addFoodItem(req, res) {
  try {
    let name = req.body.name
    let qty = req.body.quantity
    if (name == null || qty == null) {
      res.status(500).json({error: "Either name or quantity are missing"})
    }
    if (parseInt(qty) < 0) {
      res.status(500).json({error: "Quantity must not be negative"})
    }
    const result = await addFoodRow(name, qty);
    res.json(result);
  } catch (err) {
    console.log(err)
  }
}