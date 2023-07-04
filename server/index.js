const express = require("express");
const app = express();
const PORT = 8080;

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
  .connect("mongodb+srv://test:test@cluster0.ansjzrs.mongodb.net/", {
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
