const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    aboutMe: {
        type: String,
        requred: [true, "About me is required."],
        minLength: [10, "About me needs to be at least 10 characters long"]
    },
    dev_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dev' 
    },
    tech: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tech"
    }],
}, {timestamps: true});

module.exports = mongoose.model("Profile", ProfileSchema)