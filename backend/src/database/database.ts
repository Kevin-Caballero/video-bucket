import mongoose, { ConnectionOptions } from 'mongoose';
import config from '../config/config'

const dbConnect = async () => {
    const mongooseOptions: ConnectionOptions = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // user: config.MONGO_USER,
        // pass: config.MONGO_PASSWORD
    }
    try {
        const db = await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`, mongooseOptions);
        console.log('database is connected to: ', db.connection.name);
    } catch (error) {
        console.error(error);
    }
};

export default dbConnect;