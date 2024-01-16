require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = process.env.PORT || 5000;

// Use cors middleware
app.use(cors());

// Parse JSON requests
app.use(express.json());

const mongoose = require("mongoose");

const userRoute = require("./route/userRoute");
const adminRoute = require("./route/adminRoutes");
const doctorRoute = require("./route/doctorRoutes");
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.MONGO_DATABASE,
});

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB database: ${process.env.MONGO_DATABASE}`);
});

mongoose.connection.on("error", (err) => {
  console.error(`Failed to connect to MongoDB: ${err}`);
});

app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
