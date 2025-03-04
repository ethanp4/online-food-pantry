import { getAllFood, addFoodRow } from "../model/foodmodel.js";

//Controller is called directly when a route is requested
//The controller imports data manipulation functions from ../model
//Primary error handling (missing field) is done here since the result
//is also sent from here
//Some errors (ie duplicate entry) are detected by mysql and therefore
//triggered in a model function. Currently they (addFoodRow) dont sent the right 
//error code to the client 

export const getItems = async (req, res) => {
  try {
    const food = await getAllFood();
    res.json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const addItem = async (req, res) => {
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

export const getItemById = async (req, res) => {
  const itemId = req.params.id //"id" is referenced in routes.js as /item/:id
  //todo
}

