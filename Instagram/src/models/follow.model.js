const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
    },
    followee: {
        type: String,
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "accepted", "rejected"],
        message: "Status can only be pending, accepted, rejected"
    }
}, {
    timestamps: true
});

followSchema.index({ follower: 1, followee: 1 }, { unique: true });

const followModel = mongoose.model('Follows', followSchema);

module.exports = followModel;