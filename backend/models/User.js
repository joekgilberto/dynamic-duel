const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        favorites: {
            type: Array,
            default: []
        }

    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            // ret is the returned Mongoose document
            transform: (_doc, ret) => {
                delete ret.password;
                return ret;
            },
        },
    }
);

module.exports = mongoose.model("User", userSchema);
