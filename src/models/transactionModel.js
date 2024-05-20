// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
const pool = require("../services/db");

module.exports.insertpurchasedNewItemByUserId = (data, callback) => {
  const SQLSTATEMENT = `INSERT INTO wizardingTransactions(user_id,item_id) VALUES
  (?,?);`;
  const VALUES = [data.user_id, data.item_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.updatetradeItemByUserId = (data, callback) => {
  const SQLSTATEMENT = `UPDATE wizardingTransactions
  SET
  item_id=?
  WHERE user_id = ? AND item_id=?;`;
  const VALUES = [data.wanted_Item_Id, data.user_id, data.item_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.calculateExtraGalleonsAfterTrade = (data, callback) => {
  //since trading the preloved Items is cheaper than buying new, I gave the user 80% of original price
  const SQLSTATEMENT = `SELECT (SELECT galleons FROM wizardingEssentials WHERE item_id = ?) * 0.8 - galleons AS total_Galleons_From_Trading
  FROM wizardingEssentials
  WHERE item_id = ?;
  `;
  const VALUES = [data.item_id, data.wanted_Item_Id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.SelectItemsThatUserCanTradeFor = (data, callback) => {
  const SQLSTATEMENT = `
  SELECT item_id
  FROM wizardingTransactions
  where user_id=?;
  SELECT *
  FROM wizardingEssentials
  WHERE galleons < (
    SELECT galleons
    FROM wizardingEssentials
    WHERE item_id = ?
  )*0.8;
  `;
  const VALUES = [data.user_id, data.item_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.SelectPurchasedNewItem = (data, callback) => {
  const SQLSTATEMENT = `SELECT wizardingTransactions.*, wizardingEssentials.item_name
  FROM wizardingTransactions
  INNER JOIN wizardingEssentials ON wizardingEssentials.item_id = wizardingTransactions.item_id
  WHERE transaction_id=?;`;
  const VALUES = [data.transaction_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.SelectIfUserAlreadyOwnsItem = (data, callback) => {
  const SQLSTATEMENT = `SELECT * FROM wizardingTransactions
  WHERE user_id=? AND item_id=?`;
  const VALUES = [data.user_id, data.item_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.selectUserAndItemExits = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT EXISTS(
      SELECT 1 FROM User
      WHERE user_id=?
    )AS exists_check;
    SELECT EXISTS(
      SELECT 1 FROM wizardingEssentials
      WHERE item_id=?
    )AS exists_check;`;
  const VALUES = [data.user_id, data.item_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.selectUserOwnerShipOfItem = (data, callback) => {
  const SQLSTATEMENT = `SELECT user_id FROM wizardingTransactions
  WHERE item_id=?;`;
  const VALUES = [data.item_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.deleteOwnedItem = (data, callback) => {
  const SQLSTATEMENT = `
  DELETE FROM wizardingTransactions
  WHERE user_id=? AND item_id=?;
  ALTER TABLE wizardingTransactions AUTO_INCREMENT=1;
  `;
  const VALUES = [data.user_id, data.item_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
