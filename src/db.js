import mongoose from "mongoose";

export default {
    connect() {
        
        mongoose.connect(process.env.MONGO_URL);
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function() {
            console.log("Connected Successfully");
        })
    }
}