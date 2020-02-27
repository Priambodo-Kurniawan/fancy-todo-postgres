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
    } else if (err.message){
        let code = 404;
        if (err.code) {
            code = err.code;
        }
        res.status(code).json({
           'message': err.message
        })
    } else {
        res.status(500).json({message: 'Internal Server Error'})
    }
}