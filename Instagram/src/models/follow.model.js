const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [ true, "Follower is required" ]
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [ true, "Following is required" ]
    }
}, {
    timestamps: true
});

const followModel = mongoose.model('Follows', followSchema);

module.exports = followModel;