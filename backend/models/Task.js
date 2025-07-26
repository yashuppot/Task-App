const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);
