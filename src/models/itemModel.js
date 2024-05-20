// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
const pool = require("../services/db");

module.exports.selectAllWizardingItems = (callback) => {
  const SQLSTATEMENT = `SELECT *
   FROM  wizardingEssentials; 
  `;
  pool.query(SQLSTATEMENT, callback);
};

module.exports.selectItemsUserOwn= (data,callback) => {
  const SQLSTATEMENT = `
  SELECT wizardingEssentials.item_name, wizardingTransactions.item_id
  FROM  wizardingEssentials
  INNER JOIN wizardingTransactions ON  wizardingEssentials.item_id = wizardingTransactions.item_id
  where user_id=?;
  `;
  const VALUES = [data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.getWantedItem = (data, callback) => {
  const SQLSTATEMENT = `SELECT *
   FROM  wizardingEssentials WHERE item_id=?; 
  `;
  const VALUES = [data.wanted_Item_Id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectWizardingItemsWithinUserGalleonRange = (
  data,
  callback
) => {
  const SQLSTATEMENT = `SELECT * FROM wizardingEssentials
  where galleons<=?;
  `;
  const VALUES = [data.total_galleons];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.selectGalleonsOfItemAndUser = (data, callback) => {
  const SQLSTATEMENT = `
   SELECT total_galleons
   FROM  galleonsChecker
   where user_id=?;
   SELECT galleons
   FROM  wizardingEssentials
   where item_id=?;
  `;
  const VALUES = [data.user_id, data.item_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.selectGalleonsOfItem = (data, callback) => {
  const SQLSTATEMENT = `
   SELECT galleons
   FROM  wizardingEssentials
   where item_id=?;
  `;
  const VALUES = [data.item_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.selectItemsThatUserCanTradeFor = (data, callback) => {
  const SQLSTATEMENT = `SELECT * FROM wizardingEssentials
  where galleons<=?;
  `;
  const VALUES = [data.total_galleons];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
