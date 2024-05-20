// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474

// REQUIRE MODULES
const express = require("express");
// CREATE ROUTER
const router = express.Router();
const controller = require("../controllers/transactionController");
// DEFINE ROUTES
router
  .route("/:user_id/:item_id")
  .get(
    controller.readItemsThatUserCanTradeFor,
    controller.displayItemsThatUserCanTradeFor
  )
  .post(
    controller.checkIfUserAlreadyOwnsItem,
    controller.purchaseNewItemByUserId,
    controller.displayPurchasedNewItem
  )
  .put(controller.checkRequestBodyandWantedItemExits,controller.readItemsThatUserCanTradeFor,controller.tradeItemByUserId,controller.addGalleonsFromTrading)
  .delete(controller.resellItemByUserId, controller.addGalleonsResellingPrice);
// EXPORT ROUTER
module.exports = router;
