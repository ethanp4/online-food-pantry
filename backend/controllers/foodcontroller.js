import { getAllFood, getFoodItemById } from "../model/foodmodel.js";


export const getItems = async (req, res) => {
  try {
    const food = await getAllFood();
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: "Failed to get items" });
  }
}

export const getItemById = async (req, res) => {
  const itemId = req.params.id //"id" is referenced in routes.js as /item/:id
  let item = await getFoodItemById(itemId)
  if (item) {
    res.status(200).json({ item: item })
  } else {
    res.status(404).json({ error: "Item not found" })
  }
}

