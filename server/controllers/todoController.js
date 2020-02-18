const db = require('../database/models');
const { Todo } = db;

// var util = require('../helpers/util');
var methods = {};

methods.getAll = async (req, res) => {
    try {
        const todos = await Todo.findAll();
        if (todos) {
            return res.status(200).json({ todos })
        };
    } catch {
        return res.status(500).json({error: error.message});
    }
};

methods.getByUserId = (req, res) => {
};

methods.create = async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        return res.status(201).json ({
            todo
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

methods.getTodoById = async (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = await Todo.findOne({
            where: { id: todoId }
        });
        if (todo) {
            return res.status(200).json({ todo })
        };
        return res.status(404).json({
            error: {
                code: 404,
                message: 'Todo with the specified ID does not exists'
            }
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

methods.updateTodoById = async (req, res) => {
    try {
        const todoId = req.params.id;
        const update = await Todo.update(req.body, {
            where: { id: todoId }
        });
        if (update) {
            const updatedTodo = await Todo.findOne({ where: { id: todoId }});
            return res.status(200).json({ todo: updatedTodo });
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

methods.deleteTodoById = async (req, res) => {
    try {
        const todoId = req.params.id;
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
        return res.status(500).send(error.message);
    }
};

module.exports = methods;