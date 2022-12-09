const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please Enter Task Title'],
    maxLength: [20, 'Title cannot exceed 20 characters'],
    minLength: [3, 'Title must have atleast 3 characters']
  },
  description: {
    type: String,
    maxLength: [255, 'Description cannot exceed 255 characters']
  },
  priority: {
    type: String,
    enum: ['Low', 'Normal', 'High'],
    default: 'Low'
  },
  time: {
    type: Date,
    required: [true, 'Please Set Time for the Task']
  },
  remarks: {
    type: String
  },
  status: {
    type: String,
    enum: ['Pending', 'Uncompleted', 'Completed'],
    default: 'Pending'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});


module.exports = mongoose.model('Task', taskSchema);