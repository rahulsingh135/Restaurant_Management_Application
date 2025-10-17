require("dotenv").config({ quiet: true });
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");

const { handleDBTableCreationsChecker } = require("./controllers");

const app = express();
const PORT = process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Checking for DB Tables exist or Not.
handleDBTableCreationsChecker();

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
