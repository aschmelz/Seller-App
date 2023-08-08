// Create constants for express/mongoose
const express = require("express"); // for express
const mongoose = require("mongoose");
const database = require("./database.js"); // refer to the database.js file

const app = express();
app.use(express.json());
app.use(express.static("./public")); // express to access index.html in public folder

const itemRoutes = require("./routes/newItem.js"); 
app.use("/api/items", itemRoutes); // for /routes/newItem.js

app.listen(3000, () => console.log("Connected to Express at localhost:3000!"));