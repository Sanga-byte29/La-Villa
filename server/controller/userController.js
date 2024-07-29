const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const getUsers = async(req,res) => {
    try {
        const users = await User.find();
        if (!users) {
          res.status(400);
          throw new Error("users not found");
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

const createUser = async (req, res, next) => {
    try {
        const {password, ...rest} = req.body;

        // generate salt
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            ...rest,
            password: hashedPassword,
        });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const { password: userPassword, ...otherDetails } = user._doc;

        // Successful response with status code 201
        return res.status(201).json(otherDetails);

    } catch (error) {
        // Pass the error to the error-handling middleware
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Get user from database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User Not Found" });
        }

        // Compare the password
        const isCorrect = await bcrypt.compare(password, user.password);

        if (!isCorrect) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        // generate token set
        // set cookie
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET);
        res.cookie("jwt",token);

        //then destructure the password

        const { password: userPassword, ...rest } = user._doc;

        // If the login is successful, you can generate a token and set a cookie or respond with the user data
        return res.status(200).json({...rest,token});
    } catch (error) {
        next(error);
    }
};

const logoutUser = async(req,res,next) => {
    res.cookie("jwt", "",{expiredIn: "-1"});
    return res.json({message: "You have been logged out"});
  }




module.exports = {
    getUsers,
    createUser,
    loginUser,
    logoutUser,
};