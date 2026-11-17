const { registerUser, loginUser } = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const { user, token } = await registerUser(req.body);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { user, token } = await loginUser(req.body);
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
