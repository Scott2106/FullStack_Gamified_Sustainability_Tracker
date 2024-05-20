
// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474

// REQUIRE MODULES
const model = require("../models/luckyDrawModel");
// DEFINE CONTROLLER FUNCTION to create a new task progress
module.exports.checkWhetherUserHaveDrawn = (req, res, next) => {
  const data={
    user_id:req.params.user_id,
  }
  // const item_id = req.params.item_id;
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkWhetherUserHaveDrawn: ", error);
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      console.log("Success checkWhetherUserHaveDrawn: \n", results);
      if (results.length > 0) {
        res.status(403).json({ message: "You have already drawn for today." });
      } else {
        next();
      }
    }
  };
  model.checkWhetherUserHaveDrawn(data, callback);
};
module.exports.addIntoDrawRecord = (req, res, next) => {
  if(!req.body.result){
    res.status(400).json({message:"result is required."});
    return;
  }
  const data = {
    user_id: req.params.user_id,
    item_id: req.params.item_id,
    result: req.body.result,
    item_name: req.body.item_name,
  };
  if (data.result === "NO") {
    data.item_id = null;
  }
  
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error addIntoUserOwnItems: ", error);
      res.status(500).json({ message: "Internal Server Error." });
    }else if(data.result === "NO"){
      res.status(201).json({message:"You have not won anything."});

    } else {
      console.log("Success addIntoUserOwnItems: \n", results);
      // res.status(201).json({
      //   message: `You have won ${data.item_name} and successfully added into user own items.`,
      // });
      next();
    }
  };
  model.createNewLuckyDrawResults(data, callback);
};