const db = require('../database/models');
const { Todo } = db;

// var util = require('../helpers/util');
var methods = {};

methods.getAll = (req, res) => {
};

methods.get = (req, res) => {
};

methods.create = async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        return res.status(201).json ({
            todo
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
};

methods.getOne = (req, res) => {
};

methods.update = (req, res) => {
};

methods.delete = (req, res) => {
};

module.exports = methods;