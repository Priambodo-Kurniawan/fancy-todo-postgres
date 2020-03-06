let formatError = {
    "errors": [],
    "message": ''
  }
  
module.exports = (err, req, res, next) => {
    if (err.name == 'SequelizeValidationError'){
        err.errors.forEach(err => {
            formatError.errors.push(err.message)
        })
        formatError.message = 'Validation Error'
        res.status(400).json(formatError)
        formatError.errors = []
    } else if (err.name == 'JsonWebTokenError'){
        res.status(401).json({
           'message': 'Please login first!'
        })
    } else {
        res.status(500).json({message: err.message || 'Internal Server Error'})
    }
}