export const createOrder = async (req, res) => {
  const { user_id, items, type, delivery_time, address } = req.body
  if (!user_id || !items || !type) {
    return res.status(500).json({ message: "Missing user_id, items or type" })
  }
  if (type == "delivery" && (!delivery_time || !address)) {
    return res.status(500).json({ message: "Missing delivery_time or address" })
  }

  const newOrder = await addOrder(user_id, items, type, delivery_time, address)
  if (newOrder) {
    res.status(200).json({
      message: "Successfully created order",
      order: newOrder
    })
  } else {
    res.status(500).json({ message: "Failed to create order" })
  }
}

export const getOrdersById = async (req, res) => {
  const accessToken = req.headers.authorization
  if (!accessToken) { return res.status(500).json({ message: "Unauthorized" }) }
  try {
    const { id } = verify(accessToken, accessSecret)
    const orders = await getOrdersByUserId(id)
    if (orders) {
      res.status(200).json({
        message: "Successfully retrieved orders",
        orders: orders
      })
    } else {
      res.status(500).json({ message: "Failed to retrieve orders" })
    }
  } catch (err) {
    console.log(err.name)
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized" })
    } else {
      return res.status(500).json({ message: "Failed to get orders" })
    }
  }
}

