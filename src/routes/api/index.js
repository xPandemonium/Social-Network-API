import { Router } from 'express';
import { usersRoutes } from './usersRoutes.js';
import { thoughtsRoutes } from './thoughtsRoutes.js';

const router = Router();

// Define the base route for the API
router.use('/users', usersRoutes); // Users routes
router.use('/thoughts', thoughtsRoutes); // Thoughts routes

// Export the router to be used in the main application
export default router;