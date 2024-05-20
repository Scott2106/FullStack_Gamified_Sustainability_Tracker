// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474

// REQUIRE MODULES
const express = require("express");
// CREATE ROUTER
const router = express.Router();
const userRoutes = require("./userRoutes");
// DEFINE ROUTES
router.use("/users", userRoutes);

const taskRoutes = require("./taskRoutes");
router.use("/tasks", taskRoutes);

const taskProgessRoutes = require("./taskProgressRoutes");
router.use("/task_progress", taskProgessRoutes);

const itemRoutes = require("./itemRoutes");
router.use("/items", itemRoutes);

const transactionRoutes = require("./transactionRoutes");
router.use("/transaction", transactionRoutes);

const messageRoutes = require('./messageRoutes');
router.use("/message", messageRoutes);

const ratingRoutes = require('./ratingRoutes');
router.use("/rating", ratingRoutes);

const luckyDrawRoutes = require('./luckyDrawRoutes');
router.use("/luckydraw", luckyDrawRoutes);

// EXPORT ROUTER
module.exports = router;




