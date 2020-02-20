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
        return res.status(500).json({error: error.message});
    }
}

methods.login = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    try {
        const user = await User.findOne({
            where: { email: email }
        });

        if (user) {
            const isAuthenticated = await bcrypt.compare(password, user.password);
            if (isAuthenticated) {
                const token = jwt.sign({
                    id: user.id, 
                    email: user.email, 
                    username: user.username
                }, secret);
                res.status(200).json({
                    code: 200,
                    message: "login success",
                    token: token
                });
            } else {
                res.status(400).json({
                    code: 400,
                    message: "password is incorrect"
                });
            }
        } else {
            return res.status(404).json({
                error: {
                    code: 404,
                    message: 'User with that email does not exists'
                }
            });
        }
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}
  
methods.authUser = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (token) {
            jwt.verify(token, secret, (err, decoded) => {
              if (decoded.id == req.params.id){
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
        } else {
            res.status(401).json({
                error: {
                    code: 401,
                    message: 'Not Authorized'
                }
            });
        }
    } catch (error) {
        return res.status(500).send(error.message);
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
        return res.status(500).send(error.message);
    }
    
}
  
module.exports = methods;