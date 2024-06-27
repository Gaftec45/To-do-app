const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Not Started', 'Started', 'In Progress', 'Task Completed'],
    default: 'Not Started',
  },
  startTime: {
    type: Date,
  },
  inProgress: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  startTime: { 
    type: Date, 
    default: null 
 },
  createdAt: { 
    type: Date, 
    default: Date.now 
 }
});

module.exports = mongoose.model('Todo', todoSchema);