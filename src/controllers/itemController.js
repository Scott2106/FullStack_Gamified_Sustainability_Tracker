// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474

// REQUIRE MODULES
const itemModel = require("../models/itemModel");
const galleonModel = require("../models/galleonModel");

//controller function for reading all wizarding items
module.exports.readAllWizardingItems = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllWizardingItems:\n ", error);
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      console.log("Success readAllWizardingItems: \n", results);
      //add overview to the results
      results.forEach((item) => {
        item.rating = res.locals.allItemsRating
          .filter((rating) => {
            return rating.item_id == item.item_id;
          })
          .map((rating) => {
            return rating.rating;
          });
        item.rating = parseFloat(item.rating[0]);
      });

      results = [
        {
          overview:
            "Hi, welcome to Diagon Alley, the one and only place where you can purchase all your wizarding essentials, from Hogwarts textbooks to Quidditch broomsticks. Here, we don't use Muggle money; instead, we rely on Galleons, the currency of the Wizarding World. Remember 1 task point is equal to 0.8 galleons. While you may hesitate to utilize any of these wizarding items at first, you'll be surprised by how much these magical items can help you on your journey towards a sustainable lifestyle!",
        },
        ...results,
      ];
      res.status(200).json(results);
    }
  };
  //call the model function
  itemModel.selectAllWizardingItems(callback);
};
module.exports.readItemsUserOwn = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readItemsUsersAlreadyOwn:\n ", error);
      res.status(500).json({ message: "Internal Server Error." });
    } else if (results.length == 0) {
      res.status(404).json({ message: "User does not own any items." });
    } else {
      console.log("Success readItemsUsersAlreadyOwn: \n", results);
      res.status(200).json(results);
    }
  };
  //call the model function
  itemModel.selectItemsUserOwn(data, callback);
};
//controller function for reading wizarding items that user can purchase
module.exports.readWizardingItemsWithinUserGalleonRange = (req, res, next) => {
  //check if user_id is undefined, null or empty
  if (
    req.params.user_id == undefined ||
    req.params.user_id == null ||
    req.params.user_id == ""
  ) {
    res.sendStatus(400);
    return;
  }
  let data = {
    user_id: req.params.user_id,
  };
  const readtotalGalleonsOfUserById = new Promise((resolve, reject) => {
    const callback1 = (error, results, fields) => {
      if (error) {
        res.status(500).json({ message: "Internal Server Error." });
        return console.error("Error readtotalGalleonsOfUserById: " + error);
      } else if (results.length == 0) {
        //if user have no record of galleons in his/her possession
        res.status(404).json({
          message: "User have no record of galleons in his/her possession. ",
        });
      } else {
        data = { ...data, total_galleons: results[0].total_galleons };
        console.log("Success readtotalGalleonsOfUserById", data.total_galleons);
        resolve();
      }
    };
    //call the model function
    galleonModel.selectTotalGalleonsOfUserById(data, callback1);
  });
  //function to execute after the promise is resolved
  readtotalGalleonsOfUserById.then(() => {
    const callback2 = (error, results, fields) => {
      if (error) {
        console.error("Error displayGalleonsWithinUserRange: ", error);
        res.status(500).json({ message: "Internal Server Error." });
      } else if (results == 0) {
        //if user does not have enough galleons to buy any items in the Diagon Alley
        res.status(200).json({
          message:
            "User does not have enough galleons to buy any items in the Diagon Alley . ",
        });
      } else {
        console.log("Success displayGalleonsWithinUserRange: \n", results);
        //add overview to the results
        results = [
          {
            overview: `User-'${data.user_id}' possesses ${data.total_galleons} galleons and has the opportunity to acquire the following items:`,
          },
          ...results,
        ];
        res.status(200).json(results);
      }
    };
    //call the model function
    itemModel.selectWizardingItemsWithinUserGalleonRange(data, callback2);
  });
};
