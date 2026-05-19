import { User } from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //check is this email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);//10 is the salt rounds

        //no email exists create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();

        //create and assign a token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ message: "User registered successfully", token });
        console.log("User registered successfully", newUser);

    } catch (error) {
        console.log("Error in registration:", error);
        res.status(500).json({ message: "Server error" });
    }
}

//Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        //check password is correct
        const isPasswordvalid = await bcrypt.compare(password, user.password);
        if (!isPasswordvalid) {
            {
                return res.status(400).json({ message: "Invalid email or password" });
            }
        }

        //create and assign a token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ message: "Login successful", token });
        console.log("User logged in successfully", user);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
        console.log("Error in login:", error);
    }
}

//Google Authentication
export const googleAuth = async (req, res) => {
    try {
        const { username, email, googleId, profilepic } = req.body;

        //check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            //user exists, generate token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            return res.status(200).json({ message: "Login successful", token });
        }

        //user does not exist, create new user
        user = new User({
            username,
            email,
            googleId,
            profilepic
        });

        await user.save();
        //generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ message: "User registered successfully", token });
        console.log("User registered successfully with Google", user);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.log("Error in Google authentication:", error);
    }
}

//Logout user
export const logout = async (req, res) => {
    res.status(200).json({ message: "Logout successful" });
    console.log("User logged out successfully");
}