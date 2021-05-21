// SETUP SCHEMA
const Book = require('../models/book')

exports.createNewBook = function (req, res) {
    // retrieve new book details from req.body
    // create a new book and save to db
    Book.create({
        ...req.body
        // title: req.body.title,
        // author: req.body.author,
        // description: req.body.description,
        // category: req.body.category,
        // purchaseCount: book.purchaseCount,
        // imageUrl: req.body.imageUrl,
        // tags: req.body.tags
    }, (err, newBook) => {
        // send response to client
        if (err) {
            return res.status(500).json({message: err})
        } else {
            return res.status(200).json({message: 'new book created', newBook})
        }
    })
}

exports.fetchBooks = (req, res) => {
    // Basic Search feature
    let conditions = {}
    // check req.query for filters
    if (req.query.category) {
        conditions.category = req.query.category
    }
    if (req.query.author) {
        conditions.author = req.query.author
    }
    // if there are filters, use them in Model.find query
    // fetch all books
    Book.find(conditions, (err, books) => {
        // send response to client
        if (err) {
            res.status(500).json({message: err})
        } else {
            return res.status(200).json({ books })
        }
    })
}

exports.fetchSingleBook = (req, res) => {
    // Book.findOne({_id: req.params.id}, (err, book) => {
    //     if (err) {
    //         return res.status(500).json({message: err})
    //     } else if (!book) {
    //          return res.status(404).json({message: 'book not found'})
    //     } else {
    //         return res.status(200).json({book})
    //     }
    // })
    Book.findById(req.params.id, (err, book) => {
        if (err) {
            return res.status(500).json({message: err})
        } else if (!book) {
             return res.status(404).json({message: 'book not found'})
        } else {
            return res.status(200).json({book})
        }
    })
}

exports.updateSingleBook = (re, res) => {
    Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        category: req.body.category
    }, (err, book) => {
        if (err) {
            return res.status(500).json({message: err})
        } else if (!book) {
            return res.status(404).json({message: 'book not found'})
        } else {
            Book.save((err, savedBook) => {
                if (err) {
                    return res.status(400).json({message: err})
                } else {
                    return res.status(200).json({message: 'book updated successfully'})
                }
            })
        }
    })
}

exports.deleteSingleBook = (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, book) => {
        if (err) {
            return res.status(500).json({message: err})
        } else if(!book) {
            res.status(404).json({message: 'book not found'})
        } else {
            return res.status(200).json({message: 'book deleted successfully'})
        }
    })
}