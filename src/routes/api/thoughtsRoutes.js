import { Router } from 'express';
import { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction } from '../../controllers/thoughtsController.js';

const router = Router();

// /api/thoughts

// Define routes for thought operations
router.get('/', getAllThoughts); // Get all thoughts
router.post('/', createThought); // Create a new thought

// /api/thoughts/:id
router.get('/:id', getThoughtById); // Get a thought by ID
router.put('/:id', updateThought); // Update a thought by ID
router.delete('/:id', deleteThought); // Delete a thought by ID

// /api/thoughts/:thoughtId/reactions
router.post('/:thoughtId/reactions', addReaction); // Add a reaction to a thought
router.delete('/:thoughtId/reactions/:reactionId', removeReaction); // Remove a reaction from a thought

export { router as thoughtsRoutes };