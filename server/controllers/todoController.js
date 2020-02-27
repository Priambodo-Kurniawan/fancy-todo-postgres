const db = require('../database/models');
const { Todo } = db;
const util = require('../helpers/util');

// var util = require('../helpers/util');
var methods = {};

methods.getAll = async (req, res) => {
    try {
        const todos = await Todo.findAll();
        if (todos) {
            return res.status(200).json({ todos })
        };
    } catch (error) {
        return next(error);
    }
};

methods.create = async (req, res) => {
    const token = req.headers.token;
    util.userInfo(token, async function(user){
        try {
            req.body.user_id = user.id
            const todo = await Todo.create(req.body);
            return res.status(201).json ({
                todo
            });
        } catch (error) {
            return next(error);
        }
    });
};

methods.getTodoById = async (req, res) => {
    try {
        const todoId = req.params.id_todo;
        const todo = await Todo.findOne({
            where: { id: todoId }
        });
        if (todo) {
            return res.status(200).json({ todo })
        };
        return next({
            code: 404,
            message: 'Todo with the specified ID does not exists'
        });
    } catch (error) {
        return next(error);
    }
};

methods.updateTodoById = async (req, res) => {
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

methods.deleteTodoById = async (req, res) => {
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