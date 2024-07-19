// routes/listRoutes.js
const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// To-Do List routes
router.get('/', authenticateToken, listController.getAllLists); // GET /lists
router.post('/', authenticateToken, listController.createList); // POST /lists
router.get('/:id', authenticateToken, listController.getListById); // GET /lists/:id
router.put('/:id', authenticateToken, listController.updateList); // PUT /lists/:id
router.delete('/:id', authenticateToken, listController.deleteList); // DELETE /lists/:id

module.exports = router;
