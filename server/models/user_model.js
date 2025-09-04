const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { number } = require("zod");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//json web token
userSchema.methods.generateToken = async function () {
  return jwt.sign(
    {
      userId: this._id.toString(),
      email: this.email,
      isAdmin: this.isAdmin
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30d" }
  );
};


// Hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  console.log(user);

  if (!user.isModified("password")) {
    return next();
  }

  try {
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// // ✅ Password compare method for login
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

module.exports = mongoose.model("User", userSchema);
