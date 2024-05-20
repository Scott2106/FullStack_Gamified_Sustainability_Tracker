// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
const pool = require("../services/db");

module.exports.insertSingleTask = (data, callback) => {
  const SQLSTATEMENT = `INSERT INTO Task(title,description,points) VALUES
  (?,?,?);`;
  const VALUES = [data.title, data.description, data.points];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectNewlyCreatedTask = (data, callback) => {
  const SQLSTATEMENT = `SELECT * FROM Task 
  WHERE task_id=?;
  `;
  const VALUES = [data.task_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.selectAllTask = (callback) => {
  const SQLSTATEMENT = `SELECT * FROM Task; 
  `;
  pool.query(SQLSTATEMENT, callback);
};
module.exports.selectTaskById = (data, callback) => {
  const SQLSTATEMENT = `SELECT * FROM Task 
  where task_id=?;
  `;
  const VALUES = [data.task_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.updateTaskById = (data, callback) => {
  const SQLSTATEMENT = `UPDATE Task
  SET
  title =?,
  description =?,
  points=?
  WHERE task_id= ?;
  `;
  const VALUES = [data.title, data.description, data.points, data.task_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.deleteTaskById = (data, callback) => {
  const SQLSTATEMENT = `
  SELECT * FROM Task 
  where task_id=?;
  DELETE FROM Task
  WHERE task_id = ?;
  ALTER TABLE Task AUTO_INCREMENT=1;
  `;
  const VALUES = [data.task_id,data.task_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
