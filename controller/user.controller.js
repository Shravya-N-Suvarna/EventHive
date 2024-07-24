import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 8);
        const createdUser = new User({
            name: name,
            email: email,
            password: hashPassword,
        });
        await createdUser.save();
        res.status(201).json({
            message: "User created Successfully", user: {
                _id: createdUser._id,
                email: createdUser.email,
            },
        });
    } catch (error) {
        console.log("Error:" + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const Login = async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: "Invalid username or password" });
      }
      if (user.status !== 'accepted') {
          return res.status(403).json({ message: "User not accepted" });
      }
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: "Invalid username or password" });
      }
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.TOKEN_SECRET, {
          expiresIn: '1h',
      });
      res.status(200).json({
          message: "Login Successfully", token, user: {
              _id: user._id,
              name: user.name,
              email: user.email,
          }
      });
  } catch (error) {
      console.error("Login Error:", error.message); // Log the error message
      console.error("Error Stack:", error.stack); // Log the stack trace
      res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateUserStatus = async (req, res) => {
    try {
        const { userId, status } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.status = status;
        await user.save();
        res.status(200).json({ message: 'User status updated successfully', user });
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUsersByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const users = await User.find(status ? { status } : {});
    res.status(200).json(users);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

