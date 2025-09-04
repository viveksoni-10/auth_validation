const User = require("../models/user_model");
const bcrypt = require("bcrypt");

const home = async (req, res) => {
  try {
    res.status(200).json({ message: "Welcome to Home Page" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};


//register form

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password, phone } = req.body;

    // 1️⃣ Validate required fields
    if (!username || !email || !password || !phone) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // 2️⃣ Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // const saltRounds = 10;
    // const hashPassword = await bcrypt.hash(password, saltRounds);



    // 3️⃣ Create user
    const createUser = await User.create({ username, email, password, phone });
    res.status(201).json(
      {
        message: "User registered successfully",
        user:createUser,
        token: await createUser.generateToken(),
        userId: createUser._id.toString()
      });

  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

//login 

//login 
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if user exists
    const existsUser = await User.findOne({ email });
    if (!existsUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2️⃣ Compare password
    const isPasswordMatch = await existsUser.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3️⃣ Generate token
    const token = await existsUser.generateToken();

    // 4️⃣ Response with user details
    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        _id: existsUser._id,
        email: existsUser.email,
        username: existsUser.username,
        isAdmin: existsUser.isAdmin, // 👈 yeh frontend me kaam aayega
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};



// controllers/auth_controller.js
const user = async (req, res) => {
  try {
    const userData = req.user;
    // console.log(userData);
    res.status(200).json({userData});
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};


module.exports = { home, register, login, user};
