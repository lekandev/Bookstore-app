const { decodeToken } = require('../services/jwtService')

exports.authenticateUser = (req, res, next) => {
    // check if there is an authorization token
    if (!req.headers.authorization) {
        return res.status(401).json({message: "authorization header required"})
    }
    let splittedHeader = req.headers.authorization.split(' ')
    if (splittedHeader[0] !== 'Bearer') {
        return res.status(401).json({message: "authorization format is Bearer <token>"})
    }
    // decode token
    let token = splittedHeader[1]
    let decodedToken = decodeToken(token)
    // check if token is valid
    if (!decodedToken) {
        return res.status(401).json({message: "user not found"})
    } else {
        // allow user to continue with the request
        req.user = decodedToken
        next()
    }
    
}

exports.checkIfAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(401).json({message: "this route is restricted to admin users"}) 
    }
    return next()
}