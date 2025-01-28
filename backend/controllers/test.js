const test = async (req, res) => {
  res.status(200).json({ message: "working" })
}

module.exports = { test }