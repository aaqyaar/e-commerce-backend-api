const express = require("express");
// const morgan = require("morgan");
const cors = require("cors");
const { connectMongoDB } = require("./config/Database");
const { readdirSync } = require("fs");
const path = require("path");
require("dotenv").config();

connectMongoDB();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

// // check is not production
// if (process.env.NODE_ENV === "development") {
//   server.use(morgan("dev"));
// }

readdirSync("./routes").map((file) => {
  const route = require(`./routes/${file}`);
  server.use("/api", route);
});

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.all("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

module.exports = server;
