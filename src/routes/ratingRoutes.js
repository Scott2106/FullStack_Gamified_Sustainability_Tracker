// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474

// REQUIRE MODULES
const express = require("express");
// CREATE ROUTER
const router = express.Router();
const controller = require("../controllers/ratingController");
// DEFINE ROUTES
router.post('/', controller.addNewRating);

// EXPORT ROUTER
module.exports = router;
