// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474

// REQUIRE MODULES
const model = require("../models/ratingModel");
// DEFINE CONTROLLER FUNCTION to create a new task
module.exports.addNewRating = (req, res, next) => {
  // checks if the request body contains the required fields
  const { item_id, rating, feedback, user_id } = req.body;
  if (!item_id || !rating || !user_id) {
    res
      .status(400)
      .json({
        message: "Invalid request. Please provide all required fields.",
      });
    return;
  }
  const data = {
    item_id,
    rating,
    feedback,
    user_id,
  };

  const checkIfUserAlreadyRateTheItemPromise = new Promise(
    (resolve, reject) => {
      const checkIfUserAlreadyRateTheItemCallback = (
        error,
        results,
        fields
      ) => {
        if (error) {
          console.error("Error checkIfUserAlreadyRateTheItem: " + error);
          res.status(500).json({ message: "Internal Server Error." });
        } else if (results.length > 0) {
          console.log("Error. User already rated this item");
          res.status(409).json({ message: "User already rated this item." });
        } else {
          console.log("Success checkIfUserAlreadyRateTheItem: \n", results);
          resolve();
        }
      };
      model.selectRatingByUserIdAndItemId(
        data,
        checkIfUserAlreadyRateTheItemCallback
      );
    }
  );
  checkIfUserAlreadyRateTheItemPromise.then(() => {
    const addNewRatingCallback = (error, results, fields) => {
      if (error) {
        console.error("Error addNewRating: " + error);
        res.status(500).json({ message: "Internal Server Error." });
      } else {
        console.log("Success addNewRating: \n", results);
        res.status(201).json({ message: "Rating added successfully." });
      }
    };
    model.addNewRating(data, addNewRatingCallback);
  });
};
module.exports.getAllItemRating = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getAllItemRating: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      console.log("Success getAllItemRating: \n", results);
      res.locals.allItemsRating = results;
      next();
    }
  };  
  model.selectAllItemRating(callback);
};
