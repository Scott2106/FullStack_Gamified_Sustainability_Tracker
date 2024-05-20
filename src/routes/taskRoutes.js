// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474

// REQUIRE MODULES
const express = require("express");
// CREATE ROUTER
const router = express.Router();
const controller = require("../controllers/taskController");
// DEFINE ROUTES
router
  .route("/")
  .post(controller.createNewTask, controller.displayNewlyCreatedTask) //endpoint 06
  .get(controller.readAllTask); //endpoint 07
router
  .route("/:task_id")
  .get(controller.readTaskById) //endpoint 08
  .put(controller.updateTaskById, controller.readTaskById) //endpoint 09
  .delete(controller.deleteTaskById); //endpoint 10
// EXPORT ROUTER
module.exports = router;
