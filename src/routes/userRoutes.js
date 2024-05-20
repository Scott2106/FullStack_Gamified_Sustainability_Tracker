// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474

// REQUIRE MODULES
const express = require("express");
// CREATE ROUTER
const router = express.Router();
const controller = require("../controllers/userController");
// DEFINE ROUTES
router.get(
  "/verifyToken",
  controller.verifyToken
);
router.get(
  "/allDetails", controller.readUserRanking,
  controller.getAllUserDetails
);
router.put(
  "/updateProfile/:user_id",
  controller.updateUserProfileById
);
router
  .route("/:user_id")
  .get(controller.readUserDetails,controller.readUserRanking,controller.readCompletedTasks,controller.readOwnedItems,controller.readTotalGalleons, controller.displayUserDetailsById) //endpoint 03
  .put(controller.updateUserById, controller.displayUpdatedUser) //endpoint 04
  .delete(controller.deleteUserById); //endpoint 05

router.route("/").get(controller.readAllUser); //endpoint 02

router.post(
  "/register",
  controller.checkDuplicates,
  controller.createNewUser,
  controller.generateToken,
  controller.displayNewlyCreatedUser
);
router.post(
  "/login",
  controller.checkLoginCredentialsAndComparePassword,
  controller.generateToken,
  controller.updateLastLogin,
  controller.displayNewlyCreatedUser
);

// EXPORT ROUTER
module.exports = router;
