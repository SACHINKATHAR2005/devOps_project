import mongoose from 'mongoose';

export const connetDB = async () => {
    try {
        const Connect = await mongoose.connect(process.env.MONGO_URI);
        console.log('connect to the data base');
        return Connect;
    } catch (error) {
        console.log('not conned to the database ...', error);
        throw new error();
    }
};
