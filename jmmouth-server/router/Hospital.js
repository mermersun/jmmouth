const express = require("express");
const router = express.Router();
const joi = require("joi");
const Response = require("../utils/Response");
const pool = require("../utils/db");

//通过page和pagesize查询医院
router.get("/hospital", (req, res) => {
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
  let sql = "select * from hospital limit ?,?";
  pool.query(sql, [startIndex, size], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(Response.ok(result));
  });
});

//查询所有医院信息
router.get("/hospitals", (req, res) => {
  let sql = "select * from hospital";
  pool.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(Response.ok(result));
  });
});

//通过ID查询医院信息
router.get("/hospitalId", (req, res) => {
  let { id } = req.query;
  let schema = joi.object({
    id: joi.number().required(),
  });
  let { error, value } = schema.validate(req.query);
  if (error) {
    res.send(Response.error(400, error));
    throw error;
  }
  let sql = "select * from hospital where id=?";
  pool.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(Response.ok(result[0]));
  });
});

//通过医生id=医院ID查询医生坐诊
router.get("/ByHospitalID", (req, res) => {
  let { id } = req.query;
  let schema = joi.object({
    id: joi.required(),
  });
  let { error, value } = schema.validate(req.query);
  if (error) {
    res.send(Response.error(400, error));
    throw error;
  }
  let sql = `select h.hospital_name from  hospital h  right join  doctor d on  h.id=d.id where d.id =?`;
  pool.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(Response.ok(result));
  });
});

//通过医院区，page和pagesize查询医院
router.post("/chooseDistrict", (req, res) => {
  let { district, page, pagesize } = req.body;
  let schema = joi.object({
    page: joi.number().required(),
    pagesize: joi.number().integer().required(),
    district: joi.string().required(),
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    res.send(Response.error(400, error));
    throw error;
  }
  let startIndex = (page - 1) * 10;
  let size = parseInt(pagesize);
  let sql = `select * from hospital where district=? limit ?,?`;
  pool.query(sql, [district, startIndex, size], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(Response.ok(result));
  });
});

// 分页查询所有医院
router.get("/hospitalfy", async (req, res) => {
  let { page, pagesize } = req.query;
  let schema = joi.object({
    page: joi.number().required(),
    pagesize: joi.number().required(),
  });
  let { error, value } = schema.validate(req.query);
  if (error) {
    res.send(Response.error(400, error));
    throw error;
  }
  try {
    // 查询数组
    let startIndex = (page - 1) * pagesize;
    let size = parseInt(pagesize);
    let sql = "select * from hospital limit ?,?";
    let result = await pool.querySync(sql, [startIndex, size]);
    // 查询总条目
    let sql2 = "select count(*) as count from hospital";
    let result2 = await pool.querySync(sql2, [startIndex, size]);
    let total = result2[0].count;
    res.send(
      Response.ok({ page: parseInt(page), pagesize: size, total, result })
    );
  } catch (error) {
    res.send(Response.error(error));
  }
});
module.exports = router;
