require('dotenv').config()
const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database connection was successful');
    } catch (error) {
        console.error(error.message)
        process.exit(1);
    }
}

module.exports = ConnectDB;