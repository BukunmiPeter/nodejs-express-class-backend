const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const registerUser = async ({ name, email, password }) => {
  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);
  return { user, token };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    return { user, token };
  } else {
    throw new Error("Invalid credentials");
  }
};

module.exports = {
  registerUser,
  loginUser,
};
