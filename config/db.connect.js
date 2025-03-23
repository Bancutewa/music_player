const { default: mongoose } = require('mongoose')

const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL)
        if (connection.connection.readyState === 1) console.log('DB connection is successfully!');
        else console.log("DB is Connecting");
    } catch (error) {
        console.log("DB connection is False");
        throw new Error(error)
    }
}

module.exports = dbConnect