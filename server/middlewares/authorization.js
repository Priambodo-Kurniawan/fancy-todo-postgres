const { Todo, User } = require('../database/models');

module.exports = {
  authorization(req, res, next) {
    const idUser = req.decoded.id;
    const idTodo = req.params.id_todo;
    Todo.findByPk(idTodo)
    .then(result => {
      if (result && result.user_id == idUser) {
        next()
      } else {
        throw {
          code: 404,
          message: 'Data Not Found!'
        }
      }
    })
    .catch(err => next(err))

  }
}