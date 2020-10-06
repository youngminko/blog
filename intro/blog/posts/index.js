const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();

//parsing json so it shows approprietly
app.use(bodyParser.json());
app.use(cors());
const posts = {};

//generate random id to mimic actual ids
const { randomBytes } = require("crypto");
const { resolve } = require("path");

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });
  //resource is created
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("received Event", req.body.type);

  res.send({});
});
app.listen(4000, () => {
  console.log("listening on 4000");
});
