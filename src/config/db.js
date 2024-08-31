import mongoose from "mongoose";

const connectMongo = async () => {
    if (!process.env.MONGO_DB_URI) {
        throw new Error(
            "Add the MONGO_DB_URI environment variable inside .env to use mongoose"
        );
    }
    return mongoose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

export default connectMongo;