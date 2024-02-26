const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");
const mockedData = require("./mocked");
const { listeners } = require("process");
const { message } = require("antd");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*"
  },
  path: "/v1/socketIO"
  // pingInterval: 10000,
  // pingTimeout: 5000
});

io.on("connection", (socket) => {
  console.log("New user connected");
  console.log("URL: ", socket.handshake.url);
  console.log("Query: ", socket.handshake.query);

  const connectionStatus = (status) => {
    if (status === "active") {
      socket.emit("get_devices_status", mockedData.devicesStatus);
    } else {
      socket.disconnect(true);
    }
  };

  socket.on("update_devices_status", (message) => {
    connectionStatus(message.status);
  });

  socket.on("disconnect", () => console.log("User disconnected"));
});

server.listen(5000, () => console.log("Listening on port 5000"));
