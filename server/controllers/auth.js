require('dotenv').config();
const secret = process.env.TOKEN_SECRET;
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../database/models');
const { User } = db;
var methods = {}

methods.signup = async (req, res) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    
    try {
        const user = await User.create(req.body);
        return res.status(201).json ({
            status: true,
            message: "User Created!"
        });
    } catch (error) {
        return next(error);
    }
}

methods.login = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    try {
        const user = await User.findOne({
            where: { email: email },
        });

        if (user) {
            const isAuthenticated = await bcrypt.compare(password, user.password);
            if (isAuthenticated) {
                let userData = {
                    id: user.id, 
                    email: user.email, 
                    name: user.name
                }
                const token = jwt.sign(userData, secret);
                res.status(200).json({
                    code: 200,
                    message: "login success",
                    token: token,
                    user: userData
                });
            } else {
                next({
                    code: 400,
                    message: "password is incorrect"
                });
            }
        } else {
            return next({
                message: 'User with that email does not exists',
            });
        }
    } catch (error) {
        return next({
            code: 500,
            message: "password is incorrect"
        });
    }
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