const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../features/User');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (user) return res.status(400).json({ error: 'Email already exists' });

    const userId = await User.create(name, email, password);
    res.status(201).json({ message: 'User created successfully', userId });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
