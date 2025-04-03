const mongoose = require('mongoose');

const dbConnect = async (dbName = process.env.DATABASE_NAME) => {
    try {
        const uri = process.env.MONGO_URI;

        await mongoose.connect(uri, {
            dbName,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("DB connection established successfully!");
        return mongoose.connection;
    } catch (error) {
        console.error("Failed to connect to DB:", error);
        throw error;
    }
};

const closeConnection = async () => {
    try {
        await mongoose.connection.close();
        console.log("DB connection closed.");
    } catch (error) {
        console.error("Failed to close DB connection:", error);
    }
};

module.exports = { dbConnect, closeConnection };