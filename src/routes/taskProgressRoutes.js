// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474

// REQUIRE MODULES
const express = require("express");
// CREATE ROUTER
const router = express.Router();
const controller = require("../controllers/taskProgressController");
// DEFINE ROUTES
router
  .route("/:progress_id")
  .get(controller.getTaskProgressById) //endpoint 12
  .put(controller.updateTaskProgressById, controller.getTaskProgressById) //endpoint 13
  .delete(controller.deleteTaskProgressById, controller.updateGalleons); //endpoint 14, added new controller "updateGalleons" for the purpose of section B.

router.post(
  "/",
  controller.createTaskProgress,
  controller.displayNewTaskProgress,
  controller.addGalleons
); //endpoint 11, I added new controller "addGalleons" for the purpose of section B.
// EXPORT ROUTER
module.exports = router;
