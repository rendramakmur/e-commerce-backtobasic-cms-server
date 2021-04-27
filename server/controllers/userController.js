const { signToken } = require('../helpers/jwt');
const { checkPassword } = require('../helpers/password-helper');
const { User } = require('../models');

class UserController {
    static register (req, res, next) {
        let newUser = {
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(newUser)
        .then(data => {
            res.status(201).json({
                id: data.id,
                full_name: data.full_name,
                email: data.email
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static login (req, res, next) {
        let email = req.body.email;
        let password = req.body.password;

        if (!email) {
            next({code: 400, message: 'Email is required'})
        } else if (!password) {
            next({code: 400, message: 'Password is required'})
        } else {
            User.findOne({
                where: {
                    email
                }
            })
            .then(data => {
                if(!data) {
                    next({code: 400, message: 'Email/password is invalid'})
                } else {
                    let comparePassword = checkPassword(password, data.password);

                    if (comparePassword) {
                        let payload = {
                            id: data.id,
                            name: data.full_name,
                            email: data.email,
                            role: data.role
                        }
                        let access_token = signToken(payload)

                        res.status(200).json({
                            access_token,
                            id: data.id,
                            name: data.full_name,
                            email: data.email,
                            role: data.role
                        })

                    } else {
                        next({code: 400, message: 'Email/password is invalid'})
                    }
                }
            })
            .catch(err => {
                console.log(err);
                next(err);
            })
        }


    }
}

module.exports = UserController;