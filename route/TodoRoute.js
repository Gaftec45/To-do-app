const express = require('express');
const Todo = require('../models/TodoM');
const router = express.Router();

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get today's todos
router.get('/today', async (req, res) => {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
  
      const todos = await Todo.find({
        createdAt: { $gte: startOfDay, $lt: endOfDay }
      });
      res.json(todos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Create a new todo
router.post('/', async (req, res) => {
    const todo = new Todo({
      task: req.body.task,
      createdAt: new Date()  // Set createdAt field
    });
    try {
      const newTodo = await todo.save();
      res.status(201).json(newTodo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });  

// Update a todo
router.patch('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (req.body.task != null) {
      todo.task = req.body.task;
    }
    if (req.body.completed != null) {
      todo.completed = req.body.completed;
    }
    if (req.body.startTime != null) {
      todo.startTime = req.body.startTime;
    }
    if (req.body.inProgress != null) {
      todo.inProgress = req.body.inProgress;
    }
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;