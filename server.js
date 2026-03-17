const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const dbConfig = require("./config/dbConfig");
const adminRoutes = require("./routes/adminRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/portfolio", portfolioRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
