// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474

// REQUIRE MODULES
const model = require("../models/taskProgressModel");
// DEFINE CONTROLLER FUNCTION to create a new task progress
module.exports.createTaskProgress = (req, res, next) => {
  // checks if the request body contains the required fields
  if (
    req.body.completion_date == undefined ||
    req.body.completion_date == null ||
    req.body.completion_date == "" ||
    req.body.user_id == undefined ||
    req.body.user_id == null ||
    req.body.user_id == "" ||
    req.body.task_id == undefined ||
    req.body.task_id == null ||
    req.body.task_id == ""
  ) {
    res.sendStatus(400);
    return;
  }
  const data = {
    user_id: req.body.user_id,
    task_id: req.body.task_id,
    completion_date: req.body.completion_date,
    notes: req.body.notes,
  };
  const callback = (error, results, fields) => {
    if (error && error.errno === 1452) {
      //uses the error number to check if the user_id or task_id is invalid
      console.log("User id or task id not found.");
      res.status(404).json({
        message: "Either user_id or task_id does not exist.",
      });
    } else if (error) {
      console.error("Error createNewTaskProgress: ", error);
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      console.log("Success createNewTaskProgress: \n", results);
      //res.locals variable is used to pass data from one middleware to another
      res.locals.progress_id = results.insertId;
      // call the next middleware
      next();
    }
  };
  // call the model function
  model.createNewTaskProgress(data, callback);
};
// DEFINE CONTROLLER FUNCTION to display the newly created task progress
module.exports.displayNewTaskProgress = (req, res, next) => {
  const data = {
    progress_id: res.locals.progress_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error displayNewTaskProgress: ", error);
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      console.log("Success displayNewTaskProgress: \n", results);
      res.status(201).json(results[0]);
      //res.locals variable is used to pass data from one middleware to another
      res.locals.task_id = results[0].task_id;
      // call the next middleware
      next();
    }
  };
  // call the model function
  model.readTaskProgressById(data, callback);
};
// DEFINE CONTROLLER FUNCTION to add galleons
module.exports.addGalleons = (req, res, next) => {
  let data = {
    user_id: req.body.user_id,
    task_id: res.locals.task_id,
    progress_id: res.locals.progress_id,
  };
  const readTaskPoints = new Promise((resolve, reject) => {
    const callback1 = (error, results, fields) => {
      if (error) {
        res.status(500).json({ message: "Internal Server Error." });
        return console.error("Error readTaskPoints: " + error);
      } else {
        //data is updated with the points of the task
        data = { ...data, points: results[0].points };
        console.log("Success readTaskPoints", data.points);
        resolve();
      }
    };
    //call the model function
    model.selectTaskPoints(data, callback1);
  });
  //function to execute after the promise is resolved
  readTaskPoints.then(() => {
    const callback2 = (error, results, fields) => {
      if (error) {
        console.error("Error updateGalleons: " + error);
        res.status(500).json({ message: "Internal Server Error." });
      } else {
        console.log("Success updateGalleons: \n", results);
      }
    };
    //call the model function
    model.updateGalleons(data, callback2);
  });
};
// DEFINE CONTROLLER FUNCTION to  all task progress by Id
module.exports.getTaskProgressById = (req, res, next) => {
  if (isNaN(req.params.progress_id)) {
    res.sendStatus(422);
    return;
  }
  const data = {
    progress_id: req.params.progress_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getTaskProgressById: ", error);
      res.status(500).json({ message: "Internal Server Error." });
    } else if (results.length == 0) {
      //if task progress is not found
      console.error("Error getTaskProgressById: ", results);
      res.status(404).json({
        message: `TaskProgress with an id-${data.progress_id} does not exists.`,
      });
    } else {
      console.log("Success getTaskProgressById: \n", results);
      res.status(200).json(results[0]);
    }
  };
  // call the model function
  model.readTaskProgressById(data, callback);
};
// DEFINE CONTROLLER FUNCTION to update task progress by id
module.exports.updateTaskProgressById = (req, res, next) => {
  if (isNaN(req.params.progress_id)) {
    res.sendStatus(422);
    return;
  }
  if (
    req.body.notes == undefined ||
    req.body.notes == null ||
    req.body.notes == ""
  ) {
    //if notes is undefined, null or empty
    return res.sendStatus(400);
  }
  const data = {
    progress_id: req.params.progress_id,
    notes: req.body.notes,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateTaskProgressById: ", error);
      res.status(500).json({ message: "Internal Server Error." });
    } else if (results.affectedRows == 0) {
      console.error("Error updateTaskProgressById: ", results);
      res.status(404).json({
        message: `TaskProgress with an id-${data.progress_id} does not exists.`,
      });
      res.status(404).end();
    }  else {
      console.log("Success updateTaskProgressById: \n", results);
      //next middleware
      next();
    }
  };
  // call the model function
  model.updateTaskProgressById(data, callback);
};
// DEFINE CONTROLLER FUNCTION to delete task progress by id
module.exports.deleteTaskProgressById = (req, res, next) => {
  if (isNaN(req.params.progress_id)) {
    res.sendStatus(422);
    return;
  }
  const data = {
    progress_id: req.params.progress_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteTaskProgressById: ", error);
      res.status(500).json({ message: "Internal Server Error." });
    } else if (results[1].affectedRows == 0) {
      //if task progress is not found
      console.error("Error deleteTaskProgressById(Not Found): ", results);
      res.status(404).json({
        message: `TaskProgress with an id-${data.progress_id} does not exists.`,
      });
    } else {
      console.log("Success deleteTaskProgressById: \n", results);
      res.sendStatus(204);
      //res.locals variable is used to pass data from one middleware to another
      //task_id and user_id is passed to the next middleware
      res.locals.task_id = results[0][0].task_id;
      res.locals.user_id = results[0][0].user_id;
      next();
    }
  };
  model.deleteTaskProgressById(data, callback);
};
// DEFINE CONTROLLER FUNCTION to update galleons
module.exports.updateGalleons = (req, res, next) => {
  let data = {
    task_id: res.locals.task_id,
    user_id: res.locals.user_id,
  };
  const readTaskPoints = new Promise((resolve, reject) => {
    const callback1 = (error, results, fields) => {
      if (error) {
        res.status(500).json({ message: "Internal Server Error." });
        return console.error("Error readTaskPoints: " + error);
      } else {
        //data is updated with the points of the task
        data = { ...data, points: results[0].points };
        console.log("Success readTaskPoints", data.points);
        resolve();
      }
    };
    //call the model function
    model.selectTaskPoints(data, callback1);
  });
  //function to execute after the promise is resolved
  readTaskPoints.then(() => {
    const callback2 = (error, results, fields) => {
      if (error) {
        console.error("Error reduceGalleons: " + error);
        res.status(500).json({ message: "Internal Server Error." });
      } else {
        console.log("Success reduceGalleons: \n", results);
      }
    };
    //call the model function
    model.reduceGalleons(data, callback2);
  });
};
