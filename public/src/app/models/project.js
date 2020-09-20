const mongoose = require('../../database');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  about: {
    type: String,
    require: true,
  },
  responsible: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    require: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  finishedAt: {
    type: Date,
  },
  objectives: {
    type: String,
  },
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
