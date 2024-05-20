// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474

// REQUIRE MODULES
const express = require("express");
// CREATE ROUTER
const router = express.Router();
const controller = require("../controllers/itemController");
const ratingController = require("../controllers/ratingController");
// DEFINE ROUTES
router.get("/UserOwns/:user_id", controller.readItemsUserOwn);
router.get(
  "/withinRange/:user_id",
  controller.readWizardingItemsWithinUserGalleonRange
);
router.get("/",ratingController.getAllItemRating, controller.readAllWizardingItems);
// EXPORT ROUTER
module.exports = router;
