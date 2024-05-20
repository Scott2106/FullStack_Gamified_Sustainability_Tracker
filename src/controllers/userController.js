// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
//require dotenv for environment variables
require("dotenv").config();
//require bcrypt for password hashing and salting purposes
const bcrypt = require("bcrypt");
//require jwt for token generation
const jwt = require("jsonwebtoken");
// REQUIRE MODULES
const model = require("../models/userModel.js");
// DEFINE CONTROLLER FUNCTION to create a new user
module.exports.checkDuplicates = (req, res, next) => {
  // checks if the request body contains the required fields
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.sendStatus(400);
    return;
  }
  const data = {
    username,
    email,
    password,
  };

  const callback = (error, results, fields) => {
    if (error) {
      res.status(500).json({ message: "Internal Server Error." });
      return console.error("Error checkingDuplicates: ", error);
    } else if (results.length > 0) {
      // checks if the username or email already exists
      console.log("Error checkingDuplicates(Duplicated found): \n", results);
      return res.status(409).json({
        message:
          "Cannot register account. The username or email already associated with another user.",
      });
    } else {
      console.log("success checking: no duplicates found.");
      next();
    }
  };
  // call the model function
  model.checkEmailDuplicates(data, callback);
};
module.exports.checkLoginCredentialsAndComparePassword = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.sendStatus(400);
    return;
  }
  const data = {
    username,
    password,
  };
  const checkLoginCredentials = new Promise((resolve, reject) => {
    const checkLoginCredentialsCallback = (error, results, fields) => {
      if (error) {
        res.status(500).json({ message: "Internal Server Error." });
        return console.error("Error checkLoginCredentials: ", error);
      } else if (results.length == 0) {
        console.log("Error checkLoginCredentials: \n", results);
        res.status(404).json({
          message: "User does not exists. Please check your credentials.",
        });
      } else {
        console.log("success checkLoginCredentials: \n", results);
        res.locals.user_id = results[0].user_id;
        res.locals.hashedPw = results[0].password;
        resolve();
      }
    };
    model.checkLoginCredentials(data, checkLoginCredentialsCallback);
  });
  checkLoginCredentials.then(() => {
    const comparePwCallback = (err, match) => {
      if (err) {
        res.status(500).json({ message: "Internal Server Error." });
        return console.error("Error comparePw: ", err);
      } else if (!match) {
        console.log(`Error at comparing password. User enter incorrectly.`);
        return res
          .status(401)
          .json({ message: "Incorrect password. You may try again. " });
      } else {
        console.log(`succesful at comparing password. User enter correctly.`);
        next();
      }
    };
    bcrypt.compare(password, res.locals.hashedPw, comparePwCallback);
  });
};
module.exports.createNewUser = (req, res, next) => {
  const { username, email, password } = req.body;
  const data = {
    username,
    email,
    password,
  };
  const hashPw = new Promise((resolve, reject) => {
    const hashPwCallback = (error, hashedPw) => {
      if (error) {
        res.status(500).json({ message: "Internal Server Error." });
        return console.error("Error hashPw: " + error);
      } else {
        console.log(`succesful at hashing.`);
        res.locals.hashedPw = hashedPw;
        data.password = hashedPw;
        resolve();
      }
    };
    // bcrypt hash function
    bcrypt.hash(password, 11, hashPwCallback);
  });
  // if no error, execute the next function
  hashPw.then(() => {
    const registerUserCallback = (error, results, fields) => {
      if (error) {
        res.status(500).json({ message: "Internal Server Error." });
        return console.error("Error  registerUser: " + error);
      } else {
        console.log(`succesful at  registering new user.\n`, results);
        res.locals.user_id = results.insertId;
        next();
      }
    };
    // call the model function
    model.insertSingleUser(data, registerUserCallback);
  });
};
module.exports.generateToken = (req, res, next) => {
  const payload = {
    user_id: res.locals.user_id,
    timestamp: new Date(),
  };
  const secretKey = process.env.JWT_SECRET_KEY;
  const options = {
    algorithm: process.env.JWT_ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  };
  const callback = (err, token) => {
    if (err) {
      console.error("Error jwt:", err);
      res.status(500).json(err);
    } else {
      console.log(`succesful at generating token.`);
      res.locals.token = token;
      next();
    }
  };
  jwt.sign(payload, secretKey, options, callback);
};
module.exports.updateLastLogin = (req, res, next) => {
  const data = {
    user_id: res.locals.user_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateLastLogin: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      console.log("Success updateLastLogin: \n", results);
      next();
    }
  };
  model.updateLastLogin(data, callback);
};
// DEFINE CONTROLLER FUNCTION to display the newly created user
module.exports.displayNewlyCreatedUser = (req, res, next) => {
  const data = {
    user_id: res.locals.user_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error displayNewlyCreatedUser: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      console.log("Success displayNewlyCreatedUser: \n", results);
      res.status(201).json({ ...results[0], token: res.locals.token });
    }
  };
  // call the model functionto display the newly created user
  model.SelectNewlyCreatedUser(data, callback);
};
// DEFINE CONTROLLER FUNCTION to read all users
module.exports.readAllUser = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllUser: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      console.log("Success readAllUser: \n", results);
      res.status(200).json(results);
    }
  };
  // call the model function
  model.getAllUser(callback);
};
module.exports.getAllUserDetails = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllUserDetails: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      console.log("Success readAllUserDetails: \n", results);
      res
        .status(200)
        .json({ details: results, ranking: res.locals.ranking_list });
    }
  };
  // call the model function
  model.readAllUserDetails(callback);
};
// DEFINE CONTROLLER FUNCTION to read a single user
module.exports.readUserDetails = (req, res, next) => {
  // checks if the request parameter is a number
  if (isNaN(req.params.user_id)) {
    res.sendStatus(422);
    return;
  }
  const data = {
    user_id: req.params.user_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readUserDetails: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else if (results.length == 0) {
      // checks if the user exists
      console.error("Error readUserDetails(User Not Found): \n", results);
      res
        .status(404)
        .json({ message: `User with an id-${data.user_id} does not exists.` });
    } else {
      console.log("Success readUserDetails: \n", results);
      res.locals.username = results[0].username;
      res.locals.email = results[0].email;
      res.locals.image_link = results[0].image_link;
      next();
    }
  };
  // call the model function
  model.getUserDetailsById(data, callback);
};
module.exports.readUserRanking = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readUserRanking: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      console.log("Success readUserRanking: \n", results);
      if (data.user_id != undefined) {
        res.locals.ranking = results.filter((list) => {
          return list.user_id == data.user_id;
        })[0].ranking;
      }
      res.locals.ranking_list = results;
      next();
    }
  };
  // call the model function
  model.getUserRankingById(callback);
};
module.exports.readCompletedTasks = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readCompletedTasks: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      console.log("Success readCompletedTasks: \n", results);
      res.locals.completed_tasks = results;
      res.locals.no_completed_tasks = results.length;
      next();
    }
  };
  // call the model function
  model.getCompletedTasksById(data, callback);
};
module.exports.readOwnedItems = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readOwnedItems: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      console.log("Success readOwnedItems: \n", results);
      res.locals.owned_items = results.map((item) => {
        return item.item_name;
      });
      res.locals.no_owned_items = results.length;
    }
    next();
  };
  // call the model function
  model.getOwnedItemsById(data, callback);
};
module.exports.readTotalGalleons = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readTotalGalleons: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      console.log("Success readTotalGalleons: \n", results);
      res.locals.total_galleons = results[0].total_galleons;
      next();
    }
  };
  // call the model function
  model.getTotalGalleonsById(data, callback);
};
module.exports.displayUserDetailsById = (req, res, next) => {
  res.status(200).json({
    username: res.locals.username,
    email: res.locals.email,
    ranking: res.locals.ranking,
    completed_tasks: res.locals.completed_tasks,
    no_completed_tasks: res.locals.no_completed_tasks,
    owned_items: res.locals.owned_items,
    no_owned_items: res.locals.no_owned_items,
    total_galleons: res.locals.total_galleons,
    image_link: res.locals.image_link,
  });
};
// DEFINE CONTROLLER FUNCTION to update a single user
module.exports.updateUserById = (req, res, next) => {
  // checks if the request parameter is a number
  if (isNaN(req.params.user_id)) {
    res.sendStatus(422);
    return;
  }
  // checks if the request body contains the required fields
  if (
    req.body.username == undefined ||
    req.body.email == undefined ||
    req.body.username == null ||
    req.body.email == null ||
    req.body.username == "" ||
    req.body.email == ""
  ) {
    res.sendStatus(400);
    return;
  }
  const data = {
    user_id: req.params.user_id,
    username: req.body.username,
    email: req.body.email,
  };
  const duplicateChecker = new Promise((resolve, reject) => {
    const callback1 = (error, results, fields) => {
      if (error) {
        console.error("Error : checkingDuplicates" + error);
        res.status(500).json({ message: "Internal Server Error." });
      } else if (results[0].length == 0) {
        console.error(
          "Error : checkingDuplicates(user does not exits)" + results
        );
        res.status(404).json({
          message: `User with an id-${data.user_id} does not exists.`,
        });
      } else if (results[1][0].exists_check == 1) {
        // checks if the username or email already exists
        console.log("Error checkingDuplicates(Duplicated found): \n", results);
        res.status(409).json({
          message: "Conflict Error. The username or email already exists.",
        });
      } else {
        console.log("Success checkingDuplicates: \n", results);
        resolve();
      }
    };
    // call the model function
    model.checkUsernameAndEmailDuplicates(data, callback1);
  });
  // if no duplicates found(ie promise resolved), execute the next function
  duplicateChecker.then(() => {
    const callback2 = (error, results, fields) => {
      if (error) {
        console.error("Error updateUserById: " + error);
        res.status(500).json({ message: "Internal Server Error." });
      } else {
        console.log("Success updateUserById: \n", results);
        // call the next middleware
        next();
      }
    };
    // call the model function
    model.updateUserDetailsById(data, callback2);
  });
};
module.exports.updateUserProfileById = (req, res, next) => {
  // checks if the request parameter is a number
  if (isNaN(req.params.user_id)) {
    res.sendStatus(422);
    return;
  }
  // checks if the request body contains the required fields
  if (!req.body.image_link) {
    res.sendStatus(400);
    return;
  }
  const data = {
    user_id: req.params.user_id,
    image_link: req.body.image_link,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateUserProfileById: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else if(results.affectedRows == 0){
      res.sendStatus(404);
    }
      else {
      console.log("Success updateUserProfileById: \n", results);
      res.sendStatus(200);
    }
  };
  // call the model function
  model.updateUserProfileById(data, callback);
};
// DEFINE CONTROLLER FUNCTION to display the updated user
module.exports.displayUpdatedUser = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error displayUpdatedUser: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else if (results.length == 0) {
      // checks if the user exists
      console.error("Error displayUpdatedUser(User Not Found): \n", results);
      res.status(404).json({ message: "User does not exists." });
    } else {
      console.log("Success displayUpdatedUser: \n", results);
      res.status(200).json(results[0]);
    }
  };
  // call the model function
  model.getUserById(data, callback);
};
// DEFINE CONTROLLER FUNCTION to delete a single user
module.exports.deleteUserById = (req, res, next) => {
  // checks if the request parameter is a number
  if (isNaN(req.params.user_id)) {
    res.sendStatus(422);
    return;
  }

  const data = {
    user_id: req.params.user_id,
  };
  const callback = (error, results, fields) => {
    console.log(results);
    if (error) {
      console.error("Error displayUpdatedUser: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else if (results[0].affectedRows == 0) {
      // checks if the user exists
      console.error("Error displayUpdatedUser(User Not Found): \n", results);
      res
        .status(404)
        .json({ message: `User with an id-${data.user_id} does not exists.` });
    } else {
      console.log("Success displayUpdatedUser: \n", results);
      res.sendStatus(204);
    }
  };
  // call the model function
  model.deleteUserById(data, callback);
};

module.exports.verifyToken = (req, res, next) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  const callback = (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      console.log(decoded);
      res.status(200).json({
        message: "Token is valid",
        user_id: decoded.user_id,
      });
    }
  };
  jwt.verify(token, secretKey, callback);
};
