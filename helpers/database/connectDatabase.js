const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log('MongoDb Connection Successful');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDatabase;