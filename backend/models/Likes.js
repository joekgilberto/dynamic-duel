const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
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

module.exports = mongoose.model("Likes", LikeSchema);
