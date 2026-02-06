import { getDB } from "../db/connect.js"

export async function getAllProducts(req, res) {
  try {
    const db = getDB()
    const products = await db.collection("itemsData").find({}).toArray()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}
