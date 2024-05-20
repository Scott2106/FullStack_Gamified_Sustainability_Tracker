// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
const pool = require("../services/db");

module.exports.insertSingleUser = (data, callback) => {
  const SQLSTATEMENT = `INSERT INTO User(username,email,password)VALUES
 (?,?,?);`;
  const VALUES = [data.username, data.email, data.password];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.checkEmailDuplicates = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM User WHERE email=? OR username=?;
  `;
  const VALUES = [data.email, data.username];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.checkLoginCredentials = (data, callback) => {
  const SQLSTATEMENT = `
  SELECT user_id, password FROM User WHERE username=?;
  `;
  const VALUES = [data.username];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.updateLastLogin = (data, callback) => {
  const SQLSTATEMENT = `
  UPDATE User SET last_login=NOW() WHERE user_id=?;
  `;
  const VALUES = [data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.checkUsernameAndEmailDuplicates = (data, callback) => {
  const SQLSTATEMENT = `
  Select* FROM User
  WHERE user_id = ?;
  SELECT EXISTS(
    SELECT 1 FROM User
    WHERE (username=? OR email=?)
    AND user_id != ?
    ) AS exists_check;
    `;
  const VALUES = [data.user_id, data.username, data.email, data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.SelectNewlyCreatedUser = (data, callback) => {
  const SQLSTATEMENT = `SELECT user_id, username, email, last_login
  FROM User
  WHERE user_id = ?;
  `;
  const VALUES = [data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.getAllUser = (callback) => {
  const SQLSTATEMENT = `SELECT * FROM User;
  `;
  pool.query(SQLSTATEMENT, callback);
};
module.exports.readAllUserDetails = (callback) => {
  const SQLSTATEMENT = `SELECT User.user_id, User.username, User.email, COALESCE(galleonsChecker.total_galleons, 0) AS total_galleons, User.image_link, COUNT(TaskProgress.progress_id) AS tasks_done
  FROM User
  LEFT JOIN galleonsChecker ON User.user_id = galleonsChecker.user_id
  LEFT JOIN TaskProgress ON User.user_id = TaskProgress.user_id
  GROUP BY User.user_id, User.username, User.email, galleonsChecker.total_galleons, User.image_link
  ORDER BY tasks_done DESC;
  `;
  pool.query(SQLSTATEMENT, callback);
};
module.exports.getUserDetailsById = (data, callback) => {
  const SQLSTATEMENT = `
  SELECT username,email,image_link from User where user_id=?;
  `;
  const VALUES = [data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.getUserRankingById = (callback) => {
  const SQLSTATEMENT = `
  SELECT
    User.user_id,
    RANK() OVER (ORDER BY COUNT(TaskProgress.progress_id) DESC) AS ranking
    FROM
        User
    LEFT JOIN
        TaskProgress ON User.user_id = TaskProgress.user_id
    GROUP BY
        User.user_id
    ORDER BY
        ranking;
  `;
  pool.query(SQLSTATEMENT, callback);
};
module.exports.getCompletedTasksById = (data, callback) => {
  const SQLSTATEMENT = `
  SELECT Task.title , TaskProgress.completion_date 
    FROM Task
    INNER JOIN TaskProgress ON Task.task_id = TaskProgress.task_id WHERE TaskProgress.user_id=?;
  `;
  const VALUES = [data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.getOwnedItemsById = (data, callback) => {
  const SQLSTATEMENT = `
  SELECT wizardingEssentials.item_name
    FROM wizardingTransactions
    LEFT JOIN galleonsChecker ON galleonsChecker.user_id = wizardingTransactions.user_id
    LEFT JOIN wizardingEssentials ON wizardingEssentials.item_id = wizardingTransactions.item_id
    WHERE wizardingTransactions.user_id = ?
    GROUP BY wizardingEssentials.item_name;
  `;
  const VALUES = [data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.getTotalGalleonsById = (data, callback) => {
  const SQLSTATEMENT = `
  SELECT
  COALESCE(galleonsChecker.total_galleons, 0) AS total_galleons
  FROM
      User
  LEFT JOIN
      galleonsChecker
  ON
      User.user_id = galleonsChecker.user_id
  WHERE
      User.user_id = ?;
  `;
  const VALUES = [data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.updateUserDetailsById = (data, callback) => {
  //mysql convert function converts a value to datatype ,in this case, SIGNED(64-bit integer)
  const SQLSTATEMENT = `
  UPDATE User
  SET
  username = ?,
  email = ?
  WHERE user_id = ?;
  `;
  const VALUES = [data.username, data.email, data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.updateUserProfileById= (data, callback) => {
  //mysql convert function converts a value to datatype ,in this case, SIGNED(64-bit integer)
  const SQLSTATEMENT = `
  UPDATE User
  SET
  image_link = ?
  WHERE user_id = ?;
  `;
  const VALUES = [data.image_link, data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.getUserById = (data, callback) => {
  const SQLSTATEMENT = `
  SELECT * FROM User
  WHERE user_id = ?;
  `;
  const VALUES = [data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.deleteUserById = (data, callback) => {
  const SQLSTATEMENT = `
  DELETE FROM User
  WHERE user_id = ?;
  ALTER TABLE User AUTO_INCREMENT=1;
  `;
  const VALUES = [data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
