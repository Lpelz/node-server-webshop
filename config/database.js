const mongoose = require('mongoose');

const connectDatabase = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DATABASE_URL);
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {connectDatabase};