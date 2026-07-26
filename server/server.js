const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "10mb",
  }),
);

app.use("/api/notes", require("./routes/notes"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/upload",require("./routes/upload"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
