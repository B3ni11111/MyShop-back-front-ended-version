import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config({ path: "../config.env" }) 

const client = new MongoClient(process.env.ATLAS_URI)
let db

export async function connectDB() {
  if (!process.env.ATLAS_URI) throw new Error("ATLAS_URI is undefined!")
  await client.connect()
  db = client.db("Shop-Data")
  console.log("MongoDB connected")
}

export function getDB() {
  if (!db) throw new Error("Database not connected yet")
  return db
}
