require('dotenv').config();
const saltRounds = 10;

const db = require('../database/models');
const { User } = db;
var bcrypt = require('bcrypt');
var methods = {}

methods.findAll = async (req, res) => {
    try {
        const users = await User.findAll();
        if (users) {
            return res.status(200).json({ users })
        };
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

methods.getOne = (req, res) => {
    var userId = req.params.id;

    User.findByPk(userId)
    .then(data => {
        res.send(data);
    })
    .catch(err=>{
        res.send(err);
    })
}
methods.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({
            where: { id: userId }
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
        return res.status(500).send(error.message);
    }
}

methods.update = async (req, res) => {
    if (req.body.password){
        var salt = await crypt.genSaltSync(saltRounds);
        var hash = await bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash
    }
    try {
        const userId = req.params.id;
        const password = req.body.password
        const update = await User.update(req.body, {
            where: { id: userId, password: password  }
        });
        if (update) {
            const updatedUser = await User.findOne({ where: { id: userId }});
            return res.status(200).json({ user: updatedUser });
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

methods.remove = async (req, res) => {
    try {
        const userId = req.params.id;
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
        return res.status(500).send(error.message);
    }
}

module.exports = methods;