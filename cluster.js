const cluster = require("cluster");
const os = require("os");
const express = require("express");

const totalCUPs = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < totalCUPs; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  const PORT = 8000;

  app.get("/", (req, res) => {
    res.json({
      message: `Hello from express server ${process.pid}`,
    });
  });

  app.listen(PORT, () => {
    console.log("Server started on port :", PORT);
  });
}
