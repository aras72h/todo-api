const Task = require('../models/Task');

// Create a new task in a specific list
const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const { listId } = req.params;
        console.log(`title: ${title}`);
        console.log(`List ID: ${listId}`);
        const task = await Task.create({ title, list_id: listId });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all tasks for a specific list
const getAllTasks = async (req, res) => {
    try {
        const { listId } = req.params;
        const tasks = await Task.findAll({ where: { list_id: listId } });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a specific task by ID
const getTaskById = async (req, res) => {
    try {
        const { listId, taskId } = req.params;
        const task = await Task.findOne({ where: { id: taskId, list_id: listId } });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a specific task by ID
const updateTask = async (req, res) => {
    try {
        const { listId, taskId } = req.params;
        const task = await Task.findOne({ where: { id: taskId, list_id: listId } });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        const { title, completed } = req.body;
        task.title = title;
        task.completed = completed;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a specific task by ID
const deleteTask = async (req, res) => {
    try {
        const { listId, taskId } = req.params;
        const task = await Task.findOne({ where: { id: taskId, list_id: listId } });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await task.destroy();
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
