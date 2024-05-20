const pool = require("../services/db");
module.exports.selectRatingByUserIdAndItemId = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM rating WHERE user_id =? AND item_id=?;
    `;
  const VALUES = [data.user_id, data.item_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};
module.exports.addNewRating = (data, callback) => {
  const SQLSTATMENT = `
    INSERT INTO rating(item_id,rating,feedback,user_id)VALUES
    (?,?,?,?);
    `;
  const VALUES = [data.item_id, data.rating, data.feedback, data.user_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};
module.exports.selectAllItemRating = ( callback) => {
  const SQLSTATMENT = `
    SELECT wizardingEssentials.item_id, COALESCE(AVG(rating), 0) as rating
    FROM wizardingEssentials
    LEFT JOIN rating ON wizardingEssentials.item_id = rating.item_id
    GROUP BY wizardingEssentials.item_id;
    `;

  pool.query(SQLSTATMENT, callback);
};
