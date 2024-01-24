import MongoClient from "mongoose";

export default {
    connect() {
        MongoClient.connect('mongodb://localhost/project', { useNewUrlParser: true, useUnifiedTopology: true });
        const db = MongoClient.connection;
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function() {
            console.log("Connected Successfully");
        })
    }
}