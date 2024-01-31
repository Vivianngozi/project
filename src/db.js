import MongoClient from "mongoose";

export default {
    connect() {
        // let url = 'mongodb+srv://orjiviviana:chinyere2000@cluster0.mhsh0ku.mongodb.net/?retryWrites=true&w=majority';
        MongoClient.connect('mongodb://localhost/project');
        const db = MongoClient.connection;
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function() {
            console.log("Connected Successfully");
        })
    }
}