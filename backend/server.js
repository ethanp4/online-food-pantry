import dotenv from 'dotenv';
import express from "express";
import {router} from "./routes/routes.js";
import { dbConnect } from "./config/database.js";

dotenv.config();

const app = express()

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`)
  next()
})

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)

dbConnect()

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`)
})