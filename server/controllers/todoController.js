const db = require('../database/models');
const { Todo } = db;
var methods = {};

methods.getAll = (req, res, next) => {
    Todo.findAll()
    .then(todos => {
        return res.status(200).json({ todos });
    })
    .catch(err => next(err));
};

methods.create = (req, res, next) => {
    Todo.create({
        title: req.body.title,
        description: req.body.description,
        id_status: req.body.id_status,
        due_date: req.body.due_date,
        user_id: req.decoded.id
    })
    .then(todo => {
        res.status(201).json({
           todo 
        });
    })
    .catch(err => next(err));
};

methods.getTodoById = (req, res, next) => {
    let idTodo = req.params.id_todo;
    Todo.findByPk(idTodo)
    .then(todo => {
        if (todo) res.status(200).json({ todo });
        else throw {
            code: 404,
            message: 'Data not found!'
        }
    })
    .catch(err => next(err));
};

methods.updateTodoById = (req, res, next) => {
    let idTodo = req.params.id_todo;
    const {title, description, id_status, due_date} = req.body;
    Todo.update({
        title,
        description,
        id_status,
        due_date
    }, {
        where: {
            id: idTodo
        }
    })
    .then(result => {
        return Todo.findByPk(idTodo);
    })
    .then(updatedTodo => {
        return res.status(200).json({ todo: updatedTodo });
    })
    .catch(err => next(err));
};

methods.deleteTodoById = (req, res, next) => {
    let idTodo = req.params.id_todo;
    Todo.destroy({
        where: {
            id: idTodo
        }
    })
    .then(result => {
        return res.status(200).json({
            status: true,
            message: "Todo deleted"
        });
    })
    .catch(err => next(err));
};

module.exports = methods;