const express = require("express");
const router = express.Router();
const joi = require("joi");
const Response = require("../utils/Response");
const pool = require("../utils/db");

//模糊查询所有医院名称
router.post("/HD", (req, res) => {
  let { hospital_name } = req.body;
  console.log(req.body.hospital_name);
  console.log(req.body.doctor_name);
  let sql = `select h.id, h.hospital_name from hospital h,doctor d where h.hospital_name like ? `;
  pool.query(sql, [`%${hospital_name}%`], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(Response.ok(result));
  });
});
module.exports = router;
