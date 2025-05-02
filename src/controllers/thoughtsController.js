import { User, Thought } from '../models/index.js';

// Get all thoughts
export const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find().populate('username').populate('reactions');
        res.status(200).json(thoughts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving thoughts', error });
    }
};

// Get a single thought by ID
export const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id).populate('username').populate('reactions');
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving thought', error });
    }
};

// Create a new thought
export const createThought = async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        // Update the user's thoughts array
        await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } }, { new: true });
        res.status(201).json(newThought);
    } catch (error) {
        res.status(400).json({ message: 'Error creating thought', error });
    }
};

// Update a thought by ID
export const updateThought = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(updatedThought);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating thought', error });
    }
}

// Delete a thought by ID
export const deleteThought = async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.id);
        if (!deletedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        // Update the user's thoughts array
        await User.findByIdAndUpdate(deletedThought.userId, { $pull: { thoughts: req.params.id } });
        res.status(200).json({ message: 'Thought deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting thought', error });
    }
};

// Add a reaction to a thought
export const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    } catch (error) {
        res.status(400).json({ message: 'Error adding reaction', error });
    }
};

// Remove a reaction from a thought
export const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ message: 'Error removing reaction', error });
    }
};