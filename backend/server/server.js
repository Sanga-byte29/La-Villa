const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const port = process.env.PORT || 5000;
const {errorHandler} = require("./middleware/errorHandler");


//connect to database
connectDB();

//setup middleware
app.use(express.json());

// setup routes
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

//error
app.use(errorHandler)





app.listen(port, () => console.log(`listening on port ${port}`))