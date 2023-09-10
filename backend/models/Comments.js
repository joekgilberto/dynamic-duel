const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
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

module.exports = mongoose.model("Comments", commentSchema);
