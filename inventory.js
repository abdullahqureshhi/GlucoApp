const pool = require('../DBase/db');

async function createInventoryTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS inventory (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      name VARCHAR(100) NOT NULL,
      quantity INT DEFAULT 0,
      price DECIMAL(10, 2),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `;
  await pool.query(query);
}

createInventoryTable();

const Inventory = {
  async create(userId, name, quantity, price) {
    const [result] = await pool.query(
      'INSERT INTO inventory (user_id, name, quantity, price) VALUES (?, ?, ?, ?)',
      [userId, name, quantity, price]
    );
    return result.insertId;
  },

  async findAll(userId) {
    const [rows] = await pool.query('SELECT * FROM inventory WHERE user_id = ?', [userId]);
    return rows;
  }
};

module.exports = Inventory;
