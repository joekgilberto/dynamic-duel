const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
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
            transform: (_doc, ret) => {
                delete ret.password;
                return ret;
            },
        },
    }
);

module.exports = mongoose.model("User", UserSchema);
