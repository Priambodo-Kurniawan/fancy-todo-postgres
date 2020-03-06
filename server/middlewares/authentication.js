const { User } = require('../database/models');
const { verifyToken } = require('../helpers/jwt');

module.exports = {
  authentication(req, res, next) {
    const token = req.headers.token;

    try {
      req.decoded = verifyToken(token);

      User.findByPk(req.decoded.id)
      .then(result => {
        if (result) {
          next()
        } else {
          throw {
            code: 401,
            message: 'Please login first!'
          }
        }
      })
    } catch(err) {
      next(err)
    }
  }
}