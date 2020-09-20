const mongoose = require('../../database');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    require: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  team:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  completed: {
    type: Boolean,
    require: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  finishedAt: {
    type: Date,
  },
  tecnology: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tecnology',
    require: true, //talvez nem toda tarefa do projeto envolva tecnologia, como a parte de negócio, reuniões e etc
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    require: true,
  },
  subcategory: {
    type: String,
    require: true,
  },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
