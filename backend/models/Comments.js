const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        comments:{
            type: Array,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Comments", CommentSchema);
