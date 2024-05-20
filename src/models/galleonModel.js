// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
const pool = require("../services/db");

module.exports.selectTotalGalleonsOfUserById = (data, callback) => {
  const SQLSTATEMENT = `SELECT * FROM galleonsChecker
  where user_id=?;
  `;
  const VALUES = [data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.reduceGalleons = (data, callback) => {
  const SQLSTATEMENT = `UPDATE galleonsChecker
  SET total_galleons = total_galleons - ?
  WHERE user_id=?;
  `;
  const VALUES = [data.item_price, data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.updateGalleons = (data, callback) => {
  const SQLSTATEMENT = `INSERT INTO galleonsChecker (user_id, total_galleons)
  VALUES (?, ?)
  ON DUPLICATE KEY UPDATE total_galleons = total_galleons + ?;
  `;
  const VALUES = [data.user_id, data.item_price, data.item_price];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
