const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const port = process.env.PORT || 5000;
const {errorHandler} = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");

//cookie-parser
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/authMiddleware");

//connect to database
connectDB();

//setup middleware
app.use(express.json());
app.use(cookieParser());

// setup routes
app.use("/auth", auth)
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes)


//error
app.use(errorHandler)





app.listen(port, () => console.log(`listening on port ${port}`))