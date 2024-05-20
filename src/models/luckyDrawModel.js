// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
const pool = require("../services/db");

module.exports.checkWhetherUserHaveDrawn = (data, callback) => {
  const SQLSTATEMENT = `SELECT * FROM luckydrawrecords WHERE user_id=? AND DATE(drawn_at) = CURDATE();`;
  const VALUES = [data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.createNewLuckyDrawResults = (data, callback) => {
  const SQLSTATEMENT = `INSERT INTO luckydrawrecords(user_id,result,item_id) VALUES
  (?,?,?);`;
  const VALUES = [data.user_id,data.result, data.item_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
