const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./model/userModel");

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(async () => {
  console.log("Connected to MongoDB");
  
  const adminExists = await User.findOne({ username: "admin" });
  if (!adminExists) {
    const admin = await User.create({
      username: "admin",
      password: "admin123",
    });
    console.log("Admin user created:", admin.username);
  } else {
    console.log("Admin user already exists");
  }
  
  process.exit();
});
