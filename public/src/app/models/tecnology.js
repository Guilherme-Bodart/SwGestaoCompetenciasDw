const mongoose = require('../../database');

const TecnologySchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    subcategory: {
        type: String,
        require: true,
    },
    nTasks: {
        type: String,
        require: true,
    },
});

const Tecnology = mongoose.model('Tecnology', TecnologySchema);

module.exports = Tecnology;
