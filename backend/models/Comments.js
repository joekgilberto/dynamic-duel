const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        description: {type: String, required: true},
        username: {type: String, required: true},
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Comments", commentSchema);
