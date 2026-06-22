const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "10mb",
  }),
);

app.use("/api/notes", require("./routes/notes"));

mongoose
  .connect("mongodb://127.0.0.1:27017/collaborativeNotes")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
