const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Profile = require("../models/profile.model");

const DevSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required."]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required."]
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    address: {
        type: String,
        required: [true, "Address is required."]
    },
    city: {
        type: String,
        required: [true, "City is required."]
    },
    state: {
        type:  String,
        required: [true, "State is required."]
    },
    password: {
        type: String,
        required: [true, "Password is required."],
    minlength: [8, "Password must be 8 characters or longer."]
    },
    tech:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tech",
    }],
    // profile:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Profile",
    // }]

}, {timestamps: true});

DevSchema.virtual('confirmPassword')
    .get( () => this.confirmPassword )
    .set( (value) => this.confirmPassword = value );

DevSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

DevSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => { 
            this.password = hash;
            next();
        })
        .catch((err) => {
            console.log("Error saving hash");
            console.log(err);
        });
});

module.exports = mongoose.model("Dev", DevSchema)