const mongoose = require('mongoose');

const uri = "mongodb+srv://tien101119:wyMrlrqLuzXBBVl8@cluster0.piobhgn.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.error("Connection failed:", err.message));