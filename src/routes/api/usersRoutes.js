import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } from '../../controllers/usersController.js';

const router = Router();

// /api/users

// Define routes for user operations
router.get('/', getAllUsers); // Get all users
router.post('/', createUser); // Create a new user

// /api/users/:id
router.get('/:id', getUserById); // Get a user by ID
router.put('/:id', updateUser); // Update a user by ID
router.delete('/:id', deleteUser); // Delete a user by ID

// /api/users/:userId/friends/:friendId
router.post('/:userId/friends/:friendId', addFriend); // Add a friend
router.delete('/:userId/friends/:friendId', removeFriend); // Remove a friend

export { router as usersRoutes };

