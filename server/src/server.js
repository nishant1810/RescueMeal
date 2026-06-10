import dotenv from "dotenv";
dotenv.config();

// console.log("1. ENV Loaded");

import http from "http";

// console.log("2. HTTP Imported");

import app from "./app.js";

// console.log("3. App Imported");

import connectDB from "./config/db.js";

// console.log("4. DB Imported");

connectDB();

// console.log("5. DB Function Called");

const server = http.createServer(app);

// console.log("6. Server Created");

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});