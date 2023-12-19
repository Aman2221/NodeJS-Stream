const express = require("express");

const app = express();
const fs = require("fs");
const PORT = process.env.PORT | 8000;

// Node js streams solver the problem of loading large set of data and sending it to the server without server
// crash because it loads and sends data chunk by chunk which results into good performance and memory usage
// this can be user in chat applications
app.get("/stream", (req, res) => {
  const stream = fs.createReadStream("./sample.txt", "utf-8");

  stream.on("data", (chuck) => res.write(chuck));
  stream.on("end", () => res.end());
});

// The problem with the following code is that it loads whole file data into memory and then sends it to the server
// Imaging you have a 100MB file and 100 users are accessing it then the server will get crashed
app.get("/", (req, res) => {
  fs.readFile("./sample.txt", (err, data) => {
    console.log(data);
    res.end(data);
  });
});

app.listen(PORT, () => console.log("listening on port", PORT));
