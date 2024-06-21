const express = require('express');
const app = express();

// Load config from env file
require("dotenv").config();

const PORT = process.env.PORT || 4000;

// Middleware to parse json request body
app.use(express.json());

// Import routes for todo API
const todoRoutes = require("./routes/todos")

// mount the todo routes 
app.use("/api/v1", todoRoutes);

// Start server  
app.listen(PORT, () => {
    console.log(`Server Started Successfully at ${PORT}`)
})

// Databse connection
const dbConnect = require("./config/database");
dbConnect();

// default route 
app.get("/", (req, res) => {
    res.send(`<h1>This is Homepage</h1>`);
})


