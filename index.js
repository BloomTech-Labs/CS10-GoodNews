require('dotenv').config();
const server = require('./server');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const mongoURL = process.env.MONGOLAB_URL || 'mongodb://127.0.0.1/goodnews';
//process.env if it exists OR local version for testing offline.

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose
    .connect(mongoURL) //Whatever mongo db database we use will go here
    .then(mongo => {
        console.log('=== Connected to MongoDB server successfully! ===');
    })
    .catch(err => {
        console.error('error', err);
    });

server.listen(port, () => console.log(`=== API running on port: ${port}! ===`));