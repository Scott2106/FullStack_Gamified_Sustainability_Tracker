// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474

//import express package and create express app instance
const express = require("express");
const app = express();
//two middleware to parse incoming json and url-encoded form data into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// SETUP ROUTES
const mainRoutes = require("./routes/mainRoutes");
app.use("/api", mainRoutes);
// SETUP STATIC FILES
app.use("/", express.static('public'));
//export the app
module.exports = app;
