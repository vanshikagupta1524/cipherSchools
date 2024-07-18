const {connect} = require("mongoose");

const MONGO_URL = "mongodb+srv://busygurmukh:Veer%402004@cluster0.q2girxr.mongodb.net"

const DB_NAME = `cs-mern`;

async function connectDB() {
    try {
        await connect(`${MONGO_URL}/${DB_NAME}`);
        console.log("MongoDB connected.");
    } catch(err) {
        console.error(err);
    }
}

connectDB();