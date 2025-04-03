const express = require("express");
const bodyParser = require('body-parser');
require('dotenv').config();
const { dbConnect } = require("./config/db.connect");
const initRoutes = require("./routes/index");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

const port = process.env.PORT || 8888;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const startServer = async () => {
    try {
        await dbConnect();
        console.log("Connected to MongoDB");
        initRoutes(app);

        app.listen(port, () => {
            console.log("SERVER IS RUNNING on the PORT", port);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();