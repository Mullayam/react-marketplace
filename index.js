const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const path = require("path");

require("./app/config/DB");
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
__dirname = path.resolve();
app.use(require("./app/routes/routes.config"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "front", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "front", "build", "index.html"));
  });
} else {
  app.listen(PORT, () => console.log("Backend Running on " + PORT));
}
