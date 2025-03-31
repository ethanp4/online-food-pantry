import dotenv from 'dotenv';
import express from "express";
import {router} from "./routes/routes.js";
import { dbConnect } from "./config/database.js";

dotenv.config();

const app = express();

// Root route to check server status
app.get('/', (req, res) => {
  res.send("Server is running successfully!");
});

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// Middleware to handle CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

// Connect to database
dbConnect();

// Start server
app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port ${process.env.PORT || 5001}`);
}).on('error', (err) => {
  console.error('Error occurred:', err);
});

