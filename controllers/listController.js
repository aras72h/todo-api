// controllers/listController.js
const List = require('../models/List');

// Get all lists for the authenticated user
const getAllLists = async (req, res) => {
    try {
        const lists = await List.findAll({ where: { user_id: req.user.id } });
        res.json(lists);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Create a new list for the authenticated user
const createList = async (req, res) => {
    try {
        const { name } = req.body;
        const list = await List.create({ name, user_id: req.user.id });
        res.status(201).json(list);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a specific list by ID for the authenticated user
const getListById = async (req, res) => {
    try {
        const list = await List.findOne({ where: { id: req.params.id, user_id: req.user.id } });
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }
        res.json(list);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a specific list by ID for the authenticated user
const updateList = async (req, res) => {
    try {
        const list = await List.findOne({ where: { id: req.params.id, user_id: req.user.id } });
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }
        const { name } = req.body;
        list.name = name;
        await list.save();
        res.json(list);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a specific list by ID for the authenticated user
const deleteList = async (req, res) => {
    try {
        const list = await List.findOne({ where: { id: req.params.id, user_id: req.user.id } });
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }
        await list.destroy();
        res.json({ message: 'List deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getAllLists,
    createList,
    getListById,
    updateList,
    deleteList,
};
