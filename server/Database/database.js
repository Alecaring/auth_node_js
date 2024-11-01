const mongoose = require('mongoose');

const username = 'caringellaalessio1306';
const password = 'KmPPz08NFVjSulmb';
const cluster = 'cluster0.w4pw3.mongodb.net';
const dbName = 'test';

const mongoURL = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL, {
            // useNewUrlParser     : true,
            // useUnifiedTopology  : true
        })
        console.log('connessione al database riuscita');
    } catch (error) {
        console.error('errore di connessione al databse', error);
        process.exit(1);
    }
};

module.exports = connectDB;