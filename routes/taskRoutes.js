const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Task routes
router.post('/:listId/tasks', authenticateToken, taskController.createTask); // POST /lists/:listId/tasks
router.get('/:listId/tasks', authenticateToken, taskController.getAllTasks); // GET /lists/:listId/tasks
router.get('/:listId/tasks/:taskId', authenticateToken, taskController.getTaskById); // GET /lists/:listId/tasks/:taskId
router.put('/:listId/tasks/:taskId', authenticateToken, taskController.updateTask); // PUT /lists/:listId/tasks/:taskId
router.delete('/:listId/tasks/:taskId', authenticateToken, taskController.deleteTask); // DELETE /lists/:listId/tasks/:taskId

module.exports = router;
