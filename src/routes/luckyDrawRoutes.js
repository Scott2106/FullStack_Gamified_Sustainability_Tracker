// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474

// REQUIRE MODULES
const express = require("express");
// CREATE ROUTER
const router = express.Router();
const controller = require("../controllers/luckyDrawController");
const transactioncontroller = require("../controllers/transactionController");
// DEFINE ROUTES
router.post("/:user_id/:item_id",controller.checkWhetherUserHaveDrawn, controller.addIntoDrawRecord,transactioncontroller.checkIfUserAlreadyOwnsItemForLuckyDraw,transactioncontroller.addPurchasedRecordFromLuckyDraw);
// EXPORT ROUTER
module.exports = router;
