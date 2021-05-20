const express = require('express')
const app = express()
const port = 4000

// Express middleware
app.use(express.json())

// SET UP MONGOOSE
const mongoose = require('mongoose')
const connectionString = 'mongodb+srv://lekandev:bookstore@cluster0.sbgkm.mongodb.net/bookStoreDb?retryWrites=true&w=majority'

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

//  CREATE SCHEMA
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    category: String,
    purchaseCount: Number,
    imageUrl: String,
    tags: Array
})
const Book = mongoose.model('Book', bookSchema)

// POST request to /books to create a new book
app.post('/books', function (req, res) {
    // retrieve new book details from req.body
    // create a new book and save to db
    Book.create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        category: req.body.category,
        purchaseCount: book.purchaseCount,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags
    }, (err, newBook) => {
        // send response to client
        if (err) {
            return res.status(500).json({message: err})
        } else {
            return res.status(200).json({message: 'new book created', newBook})
        }
    })
})
// GET request to /books to fetch all books
app.get('/books', (req, res) => {
    // fetch all books
    Book.find({}, (err, books) => {
        // send response to client
        if (err) {
            res.status(500).json({message: err})
        } else {
            return res.status(200).json({ books })
        }
    })
})
// GET request to /books/:id to fetch a single book

// PUT request to /books/:id to update a single book
//DELETE request to /books/:id to delete a single book

/*
Model.find => fetch multiple documents
Model.findOne => fetch a single document
Model.findById => fetch a single document by ID
*/

app.listen(port, () => console.log(`app listening on port ${port}`))