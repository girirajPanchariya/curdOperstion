import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Bookread: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books'
    }],
}, { timestamps: true });

export const UserModel = mongoose.model("UserModel", userSchema);
