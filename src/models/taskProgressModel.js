// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
const pool = require("../services/db");

module.exports.createNewTaskProgress = (data, callback) => {
  const SQLSTATEMENT = `INSERT INTO TaskProgress(user_id,task_id,completion_date,notes) VALUES
  (?,?,?,?);`;
  const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.readTaskProgressById = (data, callback) => {
  const SQLSTATEMENT = `
  SELECT progress_id, user_id, task_id, DATE_FORMAT(completion_date, '%Y-%m-%d') AS completion_date,
  IFNULL(notes, 'No notes added yet!') AS notes
  FROM TaskProgress
  WHERE progress_id = ?;
  `;
  const VALUES = [data.progress_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectTaskPoints = (data, callback) => {
  const SQLSTATEMENT = `SELECT points
  from Task
  WHERE task_id=?;
  `;
  const VALUES = [data.task_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.updateGalleons = (data, callback) => {
  const SQLSTATEMENT = `INSERT INTO galleonsChecker (user_id, total_galleons)
  VALUES (?, ?)
  ON DUPLICATE KEY UPDATE total_galleons = total_galleons + ?;
  `;
  const points = data.points;
  const galleons = points * 0.8; // Calculate 80% of the points value
  const VALUES = [data.user_id, galleons, galleons];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.reduceGalleons = (data, callback) => {
  const SQLSTATEMENT = `UPDATE galleonsChecker
  SET total_galleons = total_galleons - ?
  WHERE user_id=?;
  `;
  const points = data.points;
  const galleons = points * 0.8; // Calculate 80% of the points value
  const VALUES = [galleons, data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.updateTaskProgressById = (data, callback) => {
  const SQLSTATEMENT = `UPDATE TaskProgress
  SET
  notes=?
  WHERE progress_id=?;
  `;
  const VALUES = [data.notes, data.progress_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.deleteTaskProgressById = (data, callback) => {
  const SQLSTATEMENT = `
  SELECT task_id,user_id FROM TaskProgress
  WHERE progress_id=?;
  DELETE FROM TaskProgress
  WHERE progress_id=?;
  ALTER TABLE TaskProgress AUTO_INCREMENT=1;
  `;
  const VALUES = [data.progress_id, data.progress_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
