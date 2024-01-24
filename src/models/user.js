import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
     }]
}, {timestamps: true});


export default mongoose.model("User", userSchema);