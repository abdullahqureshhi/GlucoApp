const express = require('express');
const { addItem, getItems } = require('../controllers/inventoryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/inventory', authMiddleware, addItem);
router.get('/inventory', authMiddleware, getItems);

module.exports = router;
