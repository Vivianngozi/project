import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {type: String, required: true},
    subtitle: {type: String},
    content: {type: String, required: true},
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
   }
},
{timestamps: true});

export default mongoose.model("Post", postSchema);