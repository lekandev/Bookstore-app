const express = require('express')
const app = express()
const port = 4000
const dbSetup = require('./database/setup')

// REQUIRE ROUTES
const bookRoutes = require('./routes/bookRoutes')
const authRoutes = require('./routes/authRoutes')

// Express middleware
app.use(express.json())

// SETUP DB
dbSetup()

// Routes
app.use('/auth', authRoutes)
app.use(bookRoutes)

/*
Model.find => fetch multiple documents
Model.findOne => fetch a single document
Model.findById => fetch a single document by ID

Model.findOneAndUpdate
Model.findByIdAndUpdate

Model.findOneAndDelete
Model.findByIdAndDelete
Model.findOneAndRemove
Model.findByIdAndRemove
*/

app.listen(port, () => console.log(`app listening on port ${port}`))