require('dotenv').config();
const secret = process.env.TOKEN_SECRET;
const jwt = require('jsonwebtoken');
const { comparePassword } = require('../helpers/bcriptjs');
const { generateToken } = require('../helpers/jwt');

const db = require('../database/models');
const { User } = db;
var methods = {};

methods.signup = (req, res, next) => {
    User.create({
        email: req.body.email,
        password: req.body.password
    })
    .then(result => {
        return res.status(201).json ({
            status: true,
            message: "User Created!"
        });
    })
    .catch(err => next(err));
}

methods.login = (req, res, next) => {
    var email = req.body.email;
    var inputPassword = req.body.password;

    User.findOne({
        where: { email: email },
    })
    .then(result => {
        if (result) {
            return result;
        } else {
            throw {
                code: 400,
                message: "email/password is incorrect"
            }
        }
    })
    .then(result => {
        const isAuthenticated = comparePassword(inputPassword, result.password);
        if (isAuthenticated) {
            const userData = {
                id: result.id,
                email: result.email,
                name: result.name
            };
            const token = generateToken(userData);
            return res.status(200).json({
                code: 200,
                message: "login success",
                token: token
            });
        } else {
            throw {
                code: 400,
                message: "email/password is incorrect"
            }
        }
    })
    .catch(err => {
        next(err);
    });
}
  
methods.authUser = async (req, res, next) => {
    try {
        const token = req.headers.token;
        jwt.verify(token, secret, (err, decoded) => {
            let idUser = req.params.id_user || req.body.user_id;

            if (decoded.id == idUser){
                req.body.token = token;
                next()
            } else {
                return next({
                    code: 401,
                    message: 'Not Authorized'
                });
            }
        });
    } catch (error) {
        return next(error);
    }
    
}
  
methods.allUser = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (token) {
            jwt.verify(token, secret, (err, decoded) => {
                if (decoded) {
                    req.body.token = token;
                    next()
                } else {
                    res.status(401).json({
                        error: {
                            code: 401,
                            message: 'Not Authorized'
                        }
                    });
                }
            })
        }
    } catch (error) {
        return next(error);
    }
    
}
  
module.exports = methods;