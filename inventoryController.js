const Inventory = require('../features/Inventory');

exports.addItem = async (req, res) => {
  const { name, quantity, price } = req.body;

  try {
    const itemId = await Inventory.create(req.user.userId, name, quantity, price);
    res.status(201).json({ message: 'Item added to inventory', itemId });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Inventory.findAll(req.user.userId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
