import mongoose from "mongoose";

export default {
    connect() {
        // let url = 'mongodb+srv://orjiviviana:chinyere2000@cluster0.mhsh0ku.mongodb.net/?retryWrites=true&w=majority';
        mongoose.connect('mongodb+srv://orjiviviana:chinyere2000@cluster0.yv4tczf.mongodb.net/?retryWrites=true&w=majority');
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function() {
            console.log("Connected Successfully");
        })
    }
}