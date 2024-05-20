// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474

// REQUIRE MODULES
const itemModel = require("../models/itemModel");
const transactionModel = require("../models/transactionModel");
const galleonModel = require("../models/galleonModel");
// DEFINE CONTROLLER FUNCTION to check if the item user wanted to trade exits
module.exports.checkRequestBodyandWantedItemExits = (req, res, next) => {
  // checks if the request body contains the required fields
  if (
    req.body.wanted_Item_Id == undefined ||
    req.body.wanted_Item_Id == null ||
    req.body.wanted_Item_Id == ""
  ) {
    res.sendStatus(400);
    return;
  }
  const data = {
    wanted_Item_Id: req.body.wanted_Item_Id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkRequestBodyandWantedItemExits: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else if (results.length == 0) {
      console.log("The item user wanted to trade does not exits.");
      res.status(404).json({
        message: `The item user wanted to trade, item with id-${data.wanted_Item_Id} does not exits in our Wizarding Essentials list.`,
      });
    } else {
      console.log("SuccesscheckRequestBodyandWantedItemExits: \n", results);
      //next middleware
      next();
    }
  };
  // call the model function
  itemModel.getWantedItem(data, callback);
};
// DEFINE CONTROLLER FUNCTION to read items that user can trade for
module.exports.readItemsThatUserCanTradeFor = (req, res, next) => {
  // checks if the request params is a number
  if (isNaN(req.params.user_id) || isNaN(req.params.item_id)) {
    res.sendStatus(422);
    return;
  }
  const data = {
    user_id: req.params.user_id,
    item_id: req.params.item_id,
  };
  const checkUserAndItemExits = new Promise((resolve, reject) => {
    const callback2 = (error, results, fields) => {
      if (error) {
        res.status(500).json({ message: "Internal Server Error." });
        return console.error("Error checkUserAndItemExits: " + error);
      } else if (
        results[0][0].exists_check == 0 ||
        results[1][0].exists_check == 0
      ) {
        //check if user or item exits
        console.log(
          "Error checkUserAndItemExits(item or user does not exits): \n",
          results
        );
        return res.status(404).json({
          message: "item or user does not exits.",
        });
      } else {
        resolve();
      }
    };
    // call the model function
    transactionModel.selectUserAndItemExits(data, callback2);
  });
  //function to execute after the promise is resolved
  checkUserAndItemExits.then(() => {
    const callback3 = (error, results, fields) => {
      if (error) {
        res.status(500).json({ message: "Internal Server Error." });
        return console.error("Error readWhetherUserOwnsTheItem: " + error);
      } else if (results.length == 0) {
        //if user does not own the item
        res.status(403).json({
          message: `User-${data.user_id} have no record of owning the item-${data.item_id}`,
        });
        return console.error(
          "Error readWhetherUserOwnsTheItem:(User does not own the item.) ",
          results
        );
      } else {
        console.log(
          "Success readWhetherUserOwnsTheItem(User Owns the Item)",
          results
        );
        const callback4 = (error, results, fields) => {
          if (error) {
            res.status(500).json({ message: "Internal Server Error." });
            return console.error("Error readItemsThatUserCanTradeFor: ", error);
          } else if (results[1].length == 0) {
            //if there are no items currently avaiable for user to trade
            res.status(404).json({
              message: `Unfortunately, There are no items currently avaiable for user to trade.`,
            });
            return console.error(
              "Error readItemsThatUserCanTradeFor:(no items currently avaiable for user to trade.) ",
              results
            );
          } else {
            console.log("Success readItemsThatUserCanTradeFor:", results);
            //filter out the items that user already owns
            let items_user_already_own = results[0].map(
              (element) => element.item_id
            ).sort((a,b)=>a-b);
            let items_user_can_buy = results[1].filter((element) => {
              return items_user_already_own.indexOf(element.item_id) == -1;
            });
            if (items_user_can_buy.length != 0) {
              //if there are items that user can trade
              results = [
                {
                  overview: `Is the item you currenly own not as helpful as you wish in your sustainbility journey? No worries you can always trade back your items. Do remember that since the items is already pre-loved, the value will become 80% of original price. Apart from the items you have already owned, User-${data.user_id} can currently trade the following items for item-${data.item_id}`,
                },
                ...items_user_can_buy,
              ];
            } else {
              //if there are no items that user can trade
              results = [
                {
                  message: `Unfortunately there is no item you can trade right now. You have already bought these items ${items_user_already_own}`,
                },
              ];
            }

            res.locals.itemsUserCanTrade = results;
            //next middleware
            next();
          }
        };
        // call the model function
        transactionModel.SelectItemsThatUserCanTradeFor(data, callback4);
      }
    };
    // call the model function
    transactionModel.SelectIfUserAlreadyOwnsItem(data, callback3);
  });
};
// DEFINE CONTROLLER FUNCTION to display items that user can trade for
module.exports.displayItemsThatUserCanTradeFor = (req, res, next) => {
  const data = {
    itemsUserCanTrade: res.locals.itemsUserCanTrade,
  };
  res.status(200).json(data.itemsUserCanTrade);
};
// DEFINE CONTROLLER FUNCTION to trade item by user id
module.exports.tradeItemByUserId = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
    item_id: req.params.item_id,
    wanted_Item_Id: req.body.wanted_Item_Id,
  };
  //check if user can trade the items
  let userCanTradeTheItems = false;
  //loop through the items user can trade from the previous middleware
  res.locals.itemsUserCanTrade.forEach((item) => {
    console.log(item);
    if (item.item_id == data.wanted_Item_Id) {
      userCanTradeTheItems = true;
    }
  });
  //if user cannot trade the items
  if (userCanTradeTheItems == false) {
    console.log("can user trade the items?(T/F): " + userCanTradeTheItems);
    return res.status(402).json({
      message: `User already own the items or the value of the user's item is lower than that of item-${data.wanted_Item_Id}, making it impossible for the trade. `,
    });
  }

  const callback = (error, results, fields) => {
    if (error && error.errno === 1452) {
      //uses the error number to check if the item user wanted to trade exits
      console.log("The item user wanted to trade does not exits.");
      res.status(404).json({
        message: `The item user wanted to trade, item with id-${data.wanted_Item_Id} does not exits.`,
      });
    } else if (error) {
      //if there is any other error
      console.error("Error tradeItemByUserId: ", error);
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      console.log("Success tradeItemByUserId: \n", results);
      //next middleware
      next();
    }
  };
  // call the model function
  transactionModel.updatetradeItemByUserId(data, callback);
};
// DEFINE CONTROLLER FUNCTION to add galleons from trading
module.exports.addGalleonsFromTrading = (req, res, next) => {
  let data = {
    user_id: req.params.user_id,
    item_id: req.params.item_id,
    wanted_Item_Id: req.body.wanted_Item_Id,
  };
  const extraGalleonsAfterTrade = new Promise((resolve, reject) => {
    const callback1 = (error, results, fields) => {
      if (error) {
        res.status(500).json({ message: "Internal Server Error." });
        return console.error("Error extraGalleonsAfterTrade: ", error);
      } else {
        //data is updated with the extra galleons user will get from trading
        data = { ...data, item_price: results[0].total_Galleons_From_Trading };
        console.log("Success extraGalleonsAfterTrade", data.item_price);
        resolve();
      }
    };
    // call the model function
    transactionModel.calculateExtraGalleonsAfterTrade(data, callback1);
  });
  //function to execute after the promise is resolved
  extraGalleonsAfterTrade.then(() => {
    const callback2 = (error, results, fields) => {
      if (error) {
        console.error("Error addGalleonsFromTrading: " + error);
        res.status(500).json({ message: "Internal Server Error." });
      } else {
        console.log("Success addGalleonsFromTrading: \n", results);
        //json response with the overview of the trade
        res.status(200).json({
          Overview: `Congraulations. You have successfully traded item-${data.item_id} for item-${data.wanted_Item_Id}`,
          Exchanging_Process: `We finalized 80% of original price of your item as the value and traded item for you.`,
          Remaining_galleons: `As part of the exchange, ${data.item_price} galleons has already been added to your account.`,
          Message: `We wish you a seamless journey towards embracing an eco-friendly lifestyle. `,
        });
      }
    };
    // call the model function
    galleonModel.updateGalleons(data, callback2);
  });
};
// DEFINE CONTROLLER FUNCTION to check if user already owns the item
module.exports.checkIfUserAlreadyOwnsItem = (req, res, next) => {
  // checks if the request params is a number
  if (isNaN(req.params.user_id) || isNaN(req.params.item_id)) {
    res.sendStatus(422);
    return;
  }
  const data = {
    user_id: req.params.user_id,
    item_id: req.params.item_id,
  };
  const checkUserAndItemExits = new Promise((resolve, reject) => {
    const callback1 = (error, results, fields) => {
      if (error) {
        res.status(500).json({ message: "Internal Server Error." });
        return console.error("Error checkUserAndItemExits: " + error);
      } else if (
        results[0][0].exists_check == 0 ||
        results[1][0].exists_check == 0
      ) {
        //check if user or item exits
        console.log(
          "Error checkUserAndItemExits(item or user does not exits): \n",
          results
        );
        return res.status(404).json({
          message: "item or user does not exits.",
        });
      } else {
        resolve();
      }
    };
    // call the model function
    transactionModel.selectUserAndItemExits(data, callback1);
  });
  //function to execute after the promise is resolved
  checkUserAndItemExits.then(() => {
    const callback2 = (error, results, fields) => {
      if (error) {
        console.error("Error checkIfUserAlreadyOwnsItem: " + error);
        res.status(500).json({ message: "Internal Server Error." });
      } else if (results.length > 0) {
        //if user already owns the item
        console.error(
          "Error checkIfUserAlreadyOwnsItem:(user already own the item) ",
          results
        );
        res.status(403).json({
          message: "You have already bought the item. Cannot repurchase twice.",
        });
      } else {
        console.log("Success checkIfUserAlreadyOwnsItem: \n", results);
        //next middleware
        next();
      }
    };
    // call the model function
    transactionModel.SelectIfUserAlreadyOwnsItem(data, callback2);
  });
};
module.exports.checkIfUserAlreadyOwnsItemForLuckyDraw= (req, res, next) => {

  const data = {
    user_id: req.params.user_id,
    item_id: req.params.item_id,
    result: req.body.result,
    item_name: req.body.item_name,
  };
  const checkUserAndItemExits = new Promise((resolve, reject) => {
    const callback1 = (error, results, fields) => {
      if (error) {
        res.status(500).json({ message: "Internal Server Error." });
        return console.error("Error checkUserAndItemExits: " + error);
      } else if (
        results[0][0].exists_check == 0 ||
        results[1][0].exists_check == 0
      ) {
        //check if user or item exits
        console.log(
          "Error checkUserAndItemExits(item or user does not exits): \n",
          results
        );
        return res.status(404).json({
          message: "item or user does not exits.",
        });
      } else {
        resolve();
      }
    };
    // call the model function
    transactionModel.selectUserAndItemExits(data, callback1);
  });
  //function to execute after the promise is resolved
  checkUserAndItemExits.then(() => {
    const callback2 = (error, results, fields) => {
      if (error) {
        console.error("Error checkIfUserAlreadyOwnsItem: " + error);
        res.status(500).json({ message: "Internal Server Error." });
      } else if (results.length > 0) {
        //if user already owns the item
        console.error(
          "Error checkIfUserAlreadyOwnsItem:(user already own the item) ",
          results
        );
        res.status(403).json({
          message:`You have win this item-${data.item_id} but this item is already in your possession. Cannot possess the same item twice.` ,
        });
      } else {
        console.log("Success checkIfUserAlreadyOwnsItem: \n", results);
        //next middleware
        next();
      }
    };
    // call the model function
    transactionModel.SelectIfUserAlreadyOwnsItem(data, callback2);
  });
};
module.exports.addPurchasedRecordFromLuckyDraw = (req, res, next) => {
  let data = {
    user_id: req.params.user_id,
    item_id: req.params.item_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error addPurchasedRecordFromLuckyDraw: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      console.log("Success addPurchasedRecordFromLuckyDraw: \n", results);
      res.status(201).json({
        message: `You have won ${req.body.item_name} and successfully added into user own items.`,
      });
    }
  };
  transactionModel.insertpurchasedNewItemByUserId(data, callback);
};
// DEFINE CONTROLLER FUNCTION to purchase new item by user id
module.exports.purchaseNewItemByUserId = (req, res, next) => {
  let data = {
    user_id: req.params.user_id,
    item_id: req.params.item_id,
  };
  const compareGalleonsOfItemAndUser = new Promise((resolve, reject) => {
    const callback1 = (error, results, fields) => {
      if (error) {
        res.status(500).json({ message: "Internal Server Error." });
        return console.error("Error compareGalleonsOfItemAndUser: " + error);
      } else if (results[0].length == 0) {
        //if user have no record of galleons in his/her possession
        res.status(404).json({
          message: "User have no record of galleons in his possession. ",
        });
        console.log(
          "User do not have any record of galleons in his possession.",
          results
        );
      } else if (results[0][0].total_galleons < results[1][0].galleons) {
        //if user does not have enough galleons to purchase the items
        console.log(
          "You do not have enough balance to purchase the items.",
          results
        );
        res.status(403).json({
          message: "You do not have sufficient galleons to purchase the item.",
        });
      } else {
        console.log("Success compareGalleonsOfItemAndUser", results);
        //data is updated with the price of the item
        data = { ...data, item_price: results[1][0].galleons };
        console.log(data.item_price);
        resolve();
      }
    };
    // call the model function
    itemModel.selectGalleonsOfItemAndUser(data, callback1);
  });
  //function to execute after the promise is resolved
  compareGalleonsOfItemAndUser
    .then(() => {
      const callback2 = (error, results, fields) => {
        if (error) {
          console.error("Error updateGalleons: " + error);
          res.status(500).json({ message: "Internal Server Error." });
        } else {
          console.log("Success updateGalleons: \n", results);
          res.locals.transaction_id = results.insertId;
        }
      };
      transactionModel.insertpurchasedNewItemByUserId(data, callback2);
    }) //reduce galleons function to execute after the promise is resolved
    .then(() => {
      const callback3 = (error, results, fields) => {
        if (error) {
          console.error("Error reduceGalleons: " + error);
          res.status(500).json({ message: "Internal Server Error." });
        } else {
          console.log("Success reduceGalleons: \n", results);
          //next middleware
          next();
        }
      };
      galleonModel.reduceGalleons(data, callback3);
    });
};
// DEFINE CONTROLLER FUNCTION to display purchased new item
module.exports.displayPurchasedNewItem = (req, res, next) => {
  const data = {
    transaction_id: res.locals.transaction_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error displayPurchasedNewItem: " + error);
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      console.log("Success displayPurchasedNewItem: \n", results);
      res.status(201).json(results[0]);
    }
  };
  // call the model function
  transactionModel.SelectPurchasedNewItem(data, callback);
};
// DEFINE CONTROLLER FUNCTION to resell item by user id
module.exports.resellItemByUserId = (req, res, next) => {
  // checks if the request params is a number
  if (isNaN(req.params.user_id) || isNaN(req.params.item_id)) {
    res.sendStatus(422);
    return;
  }
  const data = {
    user_id: req.params.user_id,
    item_id: req.params.item_id,
  };
  const checkUserOwnerShipOfItem = new Promise((resolve, reject) => {
    const callback1 = (error, results, fields) => {
      let userOwnsItem = false;
      for (let x of results) {
        if (x.user_id == data.user_id) {
          userOwnsItem = true;
        }
      }
      //check if user owns the item
      if (error) {
        res.status(500).json({ message: "Internal Server Error." });
        return console.error("Error checkUserOwnerShipOfItem: " + error);
      }  else if (!userOwnsItem) {
        //if user does not own the item
        console.log(
          "Error checkUserOwnerShipOfItem(User does not own the item.): \n",
          results
        );
        return res.status(403).json({
          Error: `User-${data.user_id} does not exit (or) he does not possess the item-${data.item_id}.`,
        });
      } else if (results.length == 0) {
        //if item does not exits
        console.log(
          "Error checkUserOwnerShipOfItem(item does not exits): \n",
          results
        );
        return res.status(404).json({
          Error: `Item-${data.item_id} does not exits in our transaction list.`,
        });
      }else {
        console.log(results);
        resolve();
      }
    };
    // call the model function
    transactionModel.selectUserOwnerShipOfItem(data, callback1);
  });
  //function to execute after the promise is resolved
  checkUserOwnerShipOfItem.then(() => {
    const callback2 = (error, results, fields) => {
      if (error) {
        console.error("Error resellItemByUserId: " + error);
        res.status(500).json({ message: "Internal Server Error." });
      } else {
        console.log("Success resellItemByUserId: \n", results);
        res.sendStatus(204);
        //next middleware
        next();
      }
    };
    // call the model function
    transactionModel.deleteOwnedItem(data, callback2);
  });
};
// DEFINE CONTROLLER FUNCTION to add galleons from reselling
module.exports.addGalleonsResellingPrice = (req, res, next) => {
  let data = {
    user_id: req.params.user_id,
    item_id: req.params.item_id,
  };
  const readItemGalleonPrice = new Promise((resolve, reject) => {
    const callback1 = (error, results, fields) => {
      if (error) {
        res.status(500).json({ message: "Internal Server Error." });
        return console.error("Error addGalleonsResellingPrice: " + error);
      } else {
        //since reselling the preloved Items is cheaper than buying new, I gave the user 60% of original price
        data = { ...data, item_price: results[0].galleons * 0.6 };
        console.log("Success addGalleonsResellingPrice: ", data.item_price);
        resolve();
      }
    };
    // call the model function
    itemModel.selectGalleonsOfItem(data, callback1);
  });
  readItemGalleonPrice.then(() => {
    const callback2 = (error, results, fields) => {
      if (error) {
        console.error("Error addGalleonsResellingPrice: " + error);
        res.status(500).json({ message: "Internal Server Error." });
      } else {
        console.log("Success addGalleonsResellingPrice: \n", results);
      }
    };
    // call the model function
    galleonModel.updateGalleons(data, callback2);
  });
};
