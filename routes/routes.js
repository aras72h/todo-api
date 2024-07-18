const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const listController = require('../controllers/listController');
const taskController = require('../controllers/taskController');

// Authentication routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);

// User profile routes
router.get('/users/:id', userController.getUserProfile);
router.put('/users/:id', userController.updateUserProfile);
router.delete('/users/:id', userController.deleteUserAccount);

// Todo list routes
router.get('/lists', listController.getAllLists);
router.post('/lists', listController.createList);
router.get('/lists/:id', listController.getListById);
router.put('/lists/:id', listController.updateList);
router.delete('/lists/:id', listController.deleteList);

// Task routes
router.get('/lists/:listId/tasks', taskController.getAllTasksInList);
router.post('/lists/:listId/tasks', taskController.createTaskInList);
router.get('/lists/:listId/tasks/:taskId', taskController.getTaskInListById);
router.put('/lists/:listId/tasks/:taskId', taskController.updateTaskInList);
router.delete('/lists/:listId/tasks/:taskId', taskController.deleteTaskInList);

module.exports = router;
