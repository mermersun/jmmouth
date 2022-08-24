const express = require("express");
const router = express.Router();
const joi = require("joi");
const Response = require("../utils/Response");
const pool = require("../utils/db");

//通过page和pagesize查询资讯
router.get("/information", (req, res) => {
  let { page, pagesize } = req.query;
  let schema = joi.object({
    page: joi.number().required(),
    pagesize: joi.number().integer().required(),
  });
  let { error, value } = schema.validate(req.query);
  if (error) {
    res.send(Response.error(400, error));
    throw error;
  }
  let startIndex = (page - 1) * 10;
  let size = parseInt(pagesize);
  let sql = "select * from information limit ?,?";
  pool.query(sql, [startIndex, size], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(Response.ok(result));
  });
});

//通过ID查询医院信息
router.get("/informationID", (req, res) => {
  let { id } = req.query;
  let schema = joi.object({
    id: joi.number().required(),
  });
  let { error, value } = schema.validate(req.query);
  if (error) {
    res.send(Response.error(400, error));
    throw error;
  }
  let sql = "select * from information where id=?";
  pool.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(Response.ok(result[0]));
  });
});
module.exports = router;
