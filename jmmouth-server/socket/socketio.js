const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("有客户端连进来了:" + socket.id);
  socket.on("textmsg", function (data) {
    console.log("客户端说：" + data);
    if (/你瞅啥/.test(data)) {
      socket.emit("textmsg", "瞅你咋地");
    } else if (/再瞅一个试试/.test(data)) {
      // socket.emit("textmsg", "试试就试试！");
      io.emit("textmsg", "兄弟们，抄家伙，干丫的");
    }
  });
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
