// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474

// REQUIRE MODULES
const model = require("../models/taskModel");
// DEFINE CONTROLLER FUNCTION to create a new task
module.exports.createNewTask = (req, res, next) => {
  // checks if the request body contains the required fields
  if (
    req.body.title == undefined ||
    req.body.description == undefined ||
    req.body.points == undefined ||
    req.body.title == null ||
    req.body.description == null ||
    req.body.points == null ||
    req.body.title == "" ||
    req.body.description == "" ||
    req.body.points == ""
  ) {
    res.sendStatus(400);
    return;
  }
  const data = {
    title: req.body.title,
    description: req.body.description,
    points: req.body.points,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createNewTask: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      console.log("Success createNewTask: \n", results);
      res.locals.task_id = results.insertId;
      // call the next middleware
      next();
    }
  };
  // call the model function
  model.insertSingleTask(data, callback);
};
// DEFINE CONTROLLER FUNCTION to display the newly created task
module.exports.displayNewlyCreatedTask = (req, res, next) => {
  const data = {
    task_id: res.locals.task_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error displayNewlyCreatedTask: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      console.log("Success displayNewlyCreatedTask: \n", results);
      res.status(201).json(results[0]);
    }
  };
  // call the model function
  model.selectNewlyCreatedTask(data, callback);
};
// DEFINE CONTROLLER FUNCTION to read all tasks
module.exports.readAllTask = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllTask: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      console.log("Success readAllTask: \n", results);
      res.status(200).json(results);
    }
  };
  // call the model function
  model.selectAllTask(callback);
};
// DEFINE CONTROLLER FUNCTION to read task by id
module.exports.readTaskById = (req, res, next) => {
  // checks if the request parameter is a number
  if (isNaN(req.params.task_id)) {
    res.sendStatus(422);
    return;
  }
  const data = {
    task_id: req.params.task_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readTaskById: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else if (results.length == 0) {
      //if task does not exist
      console.error("Error readTaskById: " , results);
      res
        .status(404)
        .json({ message: `Task with an id-${data.task_id} does not exists.` });
    } else {
      console.log("Success readTaskById: \n", results);
      res.status(200).json(results[0]);
    }
  };
  // call the model function
  model.selectTaskById(data, callback);
};
// DEFINE CONTROLLER FUNCTION to update task by id
module.exports.updateTaskById = (req, res, next) => {
  // checks if the request parameter is a number
  if (isNaN(req.params.task_id)) {
    res.sendStatus(422);
    return;
  }
  // checks if the request body contains the required
  if (
    req.body.title == undefined ||
    req.body.description == undefined ||
    req.body.points == undefined ||
    req.body.title == null ||
    req.body.description == null ||
    req.body.points == null ||
    req.body.title == "" ||
    req.body.description == "" ||
    req.body.points == ""
  ) {
    res.sendStatus(400);
    return;
  }

  const data = {
    task_id: req.params.task_id,
    title: req.body.title,
    description: req.body.description,
    points: req.body.points,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateTaskById: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else if (results.length == 0) {
      //if task does not exist
      console.error("Error updateTaskById: ", results);
      res
        .status(404)
        .json({ message: `Task with an id-${data.task_id} does not exists.` });
    } else {
      console.log("Success updateTaskById: \n", results);
      // call the next middleware
      next();
    }
  };
  // call the model function
  model.updateTaskById(data, callback);
};
// DEFINE CONTROLLER FUNCTION to delete task by id
module.exports.deleteTaskById = (req, res, next) => {
  // checks if the request parameter is a number
  if (isNaN(req.params.task_id)) {
    res.sendStatus(422);
    return;
  }
  const data = {
    task_id: req.params.task_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteTaskById: " , error);
      res.status(500).json({ message: "Internal Server Error." });
    } else if (results[0].affectedRows == 0) {
      //if task does not exist
      console.error("Error deleteTaskById: " , results);
      res
        .status(404)
        .json({ message: `Task with an id-${data.task_id} does not exists.` });
    } else {
      console.log("Success deleteTaskById: \n", results);
      res.status(200).json({
        message:`task-id ${results[0][0].task_id} & ${results[0][0].title} deleted`
      });
    }
  };
  // call the model function
  model.deleteTaskById(data, callback);
};
