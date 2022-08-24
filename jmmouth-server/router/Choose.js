const express = require("express");
const router = express.Router();
const joi = require("joi");
const Response = require("../utils/Response");
const pool = require("../utils/db");

//查询district
router.get("/district", (req, res) => {
  let sql = "select * from district";
  pool.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(Response.ok(result));
  });
});

//查询hospital_type
router.get("/hospital_type", (req, res) => {
  let sql = "select * from hospital_type";
  pool.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(Response.ok(result));
  });
});

//查询information_type
router.get("/information_type", (req, res) => {
  let sql = "select * from information_type";
  pool.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(Response.ok(result));
  });
});

//查询skill
router.get("/skill", (req, res) => {
  let sql = "select * from skill";
  pool.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(Response.ok(result));
  });
});

// 筛选分页医院
router.post("/hospital/fy/type", async (req, res) => {
  let { district, hospital_type, business, page, pagesize } = req.body;
  let schema = joi.object({
    district: joi.string().required(),
    hospital_type: joi.string().required(),
    business: joi.string().required(),
    page: joi.number().required(),
    pagesize: joi.number().required(),
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    res.send(Response.error(400, error));
    throw error;
  }
  try {
    // 查询数组
    let startIndex = (page - 1) * pagesize;
    let size = parseInt(pagesize);
    let sql =
      "select * from hospital where district=? and hospital_type=? and business like ? limit ?,?";
    let result = await pool.querySync(sql, [
      district,
      hospital_type,
      `%${business}%`,
      startIndex,
      size,
    ]);
    // 查询总条目
    let sql2 =
      "select count(*) as count from hospital where district=? and hospital_type=? and business like ?";
    let result2 = await pool.querySync(sql2, [
      district,
      hospital_type,
      `%${business}%`,
    ]);
    let total = result2[0].count;

    res.send(
      Response.ok({ page: parseInt(page), pagesize: size, total, result })
    );
  } catch (error) {
    res.send(Response.error(error));
  }
});
// 筛选分页医生
router.post("/doctor/fy/type", async (req, res) => {
  let { district, doctor_skill, page, pagesize } = req.body;
  let schema = joi.object({
    district: joi.string().required(),
    doctor_skill: joi.string().required(),
    page: joi.number().required(),
    pagesize: joi.number().required(),
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    res.send(Response.error(400, error));
    throw error;
  }
  try {
    // 查询数组
    let startIndex = (page - 1) * pagesize;
    let size = parseInt(pagesize);
    let sql =
      "select * from doctor where district=? and doctor_skill like ? limit ?,?";
    let result = await pool.querySync(sql, [
      district,
      `%${doctor_skill}%`,
      startIndex,
      size,
    ]);
    // 查询总条目
    let sql2 =
      "select count(*) as count from doctor where district=? and doctor_skill like ?";
    let result2 = await pool.querySync(sql2, [district, `%${doctor_skill}%`]);
    let total = result2[0].count;

    res.send(
      Response.ok({ page: parseInt(page), pagesize: size, total, result })
    );
  } catch (error) {
    res.send(Response.error(error));
  }
});
// 筛选分页资讯
router.post("/information/fy/type", async (req, res) => {
  let { information_type, skill, page, pagesize } = req.body;
  let schema = joi.object({
    information_type: joi.string().required(),
    skill: joi.string().required(),
    page: joi.number().required(),
    pagesize: joi.number().required(),
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    res.send(Response.error(400, error));
    throw error;
  }
  try {
    // 查询数组
    let startIndex = (page - 1) * pagesize;
    let size = parseInt(pagesize);
    let sql =
      "select * from information where information_type=? and skill like ? limit ?,?";
    let result = await pool.querySync(sql, [
      information_type,
      `%${skill}%`,
      startIndex,
      size,
    ]);
    // 查询总条目
    let sql2 =
      "select count(*) as count from information where information_type=? and skill like ?";
    let result2 = await pool.querySync(sql2, [information_type, `%${skill}%`]);
    let total = result2[0].count;

    res.send(
      Response.ok({ page: parseInt(page), pagesize: size, total, result })
    );
  } catch (error) {
    res.send(Response.error(error));
  }
});

module.exports = router;
