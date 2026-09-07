const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already exists"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    profileImage: {
        type: String,
        default: 'https://ik.imagekit.io/TeamLeakage/Stock%20Images%20WEBD/images.png',
    },
    bio: {
        type: String,
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
})

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;