// SET UP MONGOOSE
const mongoose = require('mongoose')
const connectionString = 'mongodb+srv://lekandev:bookstore@cluster0.sbgkm.mongodb.net/bookStoreDb?retryWrites=true&w=majority'

module.exports = function() {
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log('database connection successful');
        }
    })
}
