const express = require("express");
const router = express.Router();
const joi = require("joi");
const Response = require("../utils/Response");
const pool = require("../utils/db");

//登录查询
router.post("/logincx", (req, res) => {
  let { username } = req.body;
  let schema = joi.object({
    username: joi.required(),
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    res.send(Response.error(400, error));
    throw error;
  }
  let sql = "select password from login where username=?";
  pool.query(sql, [username], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(Response.ok(result));
  });
});
//注册
router.post("/register", (req, res) => {
  let { username, password, email } = req.body;
  let schema = joi.object({
    username: joi.required(),
    password: joi.number().required(),
    email: joi.number().required(),
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    res.send(Response.error(400, error));
    throw error;
  }
  let sql = "insert into login (username,password,email) values (?,?,?)";
  pool.query(sql, [username, password, email], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(Response.ok(result));
  });
});
module.exports = router;
