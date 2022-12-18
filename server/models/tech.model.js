const mongoose = require('mongoose');

const TechSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
}, {timestamps: true});

module.exports = mongoose.model("Tech", TechSchema)