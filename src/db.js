import mongoose from "mongoose";

export default {
    connect() {
        mongoose.connect('mongodb://localhost/project');
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function() {
            console.log("Connected Successfully");
        })
    }
}