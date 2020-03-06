const db = require('../database/models');
const { Todo } = db;
const util = require('../helpers/util');

// var util = require('../helpers/util');
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
    const idTodo = req.params.id_todo;
    Todo.findByPk(idTodo)
    .then(todo => {
        if (todo) res.status(200).json({ todo });
        else throw {
            code: 404,
            message: 'Data not found!'
        }
    })
    .catch(err => next(err))
};

methods.updateTodoById = async (req, res, next) => {
    try {
        const todoId = req.params.id_todo;
        const update = await Todo.update(req.body, {
            where: { id: todoId }
        });
        if (update) {
            const updatedTodo = await Todo.findOne({ where: { id: todoId }});
            return res.status(200).json({ todo: updatedTodo });
        }
    } catch (error) {
        return next(error)
    }
};

methods.deleteTodoById = async (req, res, next) => {
    try {
        const todoId = req.params.id_todo;
        const deleted = await Todo.destroy({
            where: { id: todoId }
        })
        if (deleted) {
            return res.status(200).json({
                status: true,
                message: "Todo deleted"
            });
        }
        throw new Error("Todo not found");
    } catch (error) {
        return next(error);
    }
};

module.exports = methods;