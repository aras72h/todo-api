const express = require('express');
const router = express.Router();
const { validateUserProfileUpdate } = require('../middlewares/validationMiddleware');
const { authenticateToken, authorizeUser } = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// User profile routes
router.get('/:id', [authenticateToken, authorizeUser], userController.getUserProfile); // GET /users/:id
router.put('/:id', [authenticateToken, authorizeUser, validateUserProfileUpdate()], userController.updateUserProfile); // PUT /users/:id
router.delete('/:id', [authenticateToken, authorizeUser], userController.deleteUserAccount); // DELETE /users/:id

module.exports = router;
