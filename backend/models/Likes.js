const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
    {
        likes: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Likes", likeSchema);
