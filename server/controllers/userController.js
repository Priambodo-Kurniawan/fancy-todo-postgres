require('dotenv').config();
const saltRounds = 10;

const db = require('../database/models');
const { User, Todo } = db;
var bcrypt = require('bcrypt');
var methods = {}

methods.findAll = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        if (users) {
            return res.status(200).json({ users });
        };
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

methods.getUserById = async (req, res) => {
    try {
        const userId = req.params.id_user;
        const user = await User.findOne({
            where: { id: userId },
            include: [{
                model: Todo,
                as: 'todos' // specifies how we want to be able to access our joined rows on the returned data
            }],
            attributes: { exclude: ['password'] }
        });
        if (user) {
            return res.status(200).json({ user })
        }
        return res.status(404).json({
            error: {
                code: 404,
                message: 'user with the specified ID does not exists'
            }
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

methods.update = async (req, res) => {
    if (req.body.password){
        var salt = await crypt.genSaltSync(saltRounds);
        var hash = await bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash
    }
    try {
        const userId = req.params.id_user;
        const password = req.body.password
        const update = await User.update(req.body, {
            where: { id: userId, password: password  }
        });
        if (update) {
            const updatedUser = await User.findOne({ where: { id: userId }});
            return res.status(200).json({ user: updatedUser });
        }
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

methods.remove = async (req, res) => {
    try {
        const userId = req.params.id_user;
        const deleted = await User.destroy({
            where: { id: userId }
        })
        if (deleted) {
            return res.status(200).json({
                status: true,
                message: "User deleted"
            });
        }
        throw new Error("User not found");
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = methods;