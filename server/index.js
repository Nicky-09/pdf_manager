const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const mongoose = require("mongoose");
const Router = require("./router");
const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(Router);
app.use("/uploads", express.static("upload"));
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

mongoose.connection
  .once("open", () => console.log("Connected to MongoDB"))
  .on("error", (err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});
