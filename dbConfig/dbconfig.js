const mongoose = require('mongoose');

const dbConnection = () => {

    mongoose.connect('mongodb://localhost:27017/Todos', { useNewUrlParser: true, useUnifiedTopology: true})
        .then((data) => {
            console.log(`Mongodb Server Connected with ${data.connection.host}`);
        })
}

module.exports = dbConnection