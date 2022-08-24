const express = require("express");
const app = express();
const port = 5000; // 服务端口

// 配置跨域
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

// 解析post请求参数
app.use(express.urlencoded());

/** 接口， 处理/请求 */
app.listen(port, () => {
  console.log("佳美牙科后端服务已启动...");
});

app.use(require("./router/Hospital"));
app.use(require("./router/Doctor"));
app.use(require("./router/Information"));
app.use(require("./router/Choose"));
app.use(require("./router/Search"));
app.use(require("./router/Login"));
