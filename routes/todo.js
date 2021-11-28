const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');

const isAuth = require('../middleware/isAuth');

// Add todo item
router.post('/', isAuth, todoController.addItem);

// Update todo item
router.put('/:id', isAuth, todoController.updateItem);

// Remove todo item
router.delete('/:id', isAuth, todoController.deleteItem);

// Get todo items
router.get('/', isAuth, todoController.getItems);

module.exports = router;