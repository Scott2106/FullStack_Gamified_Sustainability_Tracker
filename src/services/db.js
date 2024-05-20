// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
// the module that read env file and set environment variables
require("dotenv").config();
const mysql = require("mysql2");
const setting ={
  connectionLimit:10,//set limit to 10 connections
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DATABASE,
  multipleStatements:true, //allow multiple sql database statement
  dateStrings:true//return date as string 
}
const pool=mysql.createPool(setting);
module.exports=pool;