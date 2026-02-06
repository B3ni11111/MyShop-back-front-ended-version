
import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import { connectDB } from "./db/connect.js"
import productsRouter from "./routes/products.routes.js"

dotenv.config({ path: "./config.env" })

const app = express()

app.use(cors());
app.use(express.json())

async function startServer() {
  try {
    await connectDB()
    console.log("MongoDB connected")

   
    app.use("/api/products", productsRouter)

    app.listen(5000, () => {
      console.log("Server running on port 5000")
    })
  } catch (err) {
    console.error("Failed to start server:", err)
    process.exit(1)
  }
}

startServer()
