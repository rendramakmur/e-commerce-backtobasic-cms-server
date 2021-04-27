const { verifyToken } = require('../helpers/jwt')
const {User, Product, Banner, Cart} = require('../models')

const authentication = (req, res, next) => {
    try {
        let decode = verifyToken(req.headers.access_token);
        
        User.findOne({
            where: {
                email: decode.email
            }
        })
        .then(data => {
            if(!data) {
                next({code: 404, message: 'User not found'});
            } else {
                req.currentUser = {id: data.id, name: data.full_name, email: data.email, role: data.role}
                next();
            }
        })
        .catch(err => {
            next(err);
        })
    } catch (error) {
        next({code: 403, message: 'Authentication error, please login'})
    }

}

const authorizationProduct = (req, res, next) => {
    let id = +req.params.id;

    if (req.currentUser.role !== 'admin') {
        next({code: 403, message: 'You are not an admin'});
    } else {
        if (id) {
            Product.findByPk(id)
            .then(data => {
                if(!data) {
                    next({code: 404, message: 'Product not found'});
                } else {
                    next()
                }
            })
            .catch(err => {
                next(err);
            })
        } else {
            next();
        }
    }
}

const authorizationBanner = (req, res, next) => {
    let id = +req.params.id;

    if (req.currentUser.role !== 'admin') {
        next({code: 403, message: 'You are not an admin'})
    } else {
        if (id) {
            Banner.findByPk(id)
            .then(data => {
                if (!data) {
                    next({code: 404, message: 'Banner not found'})
                } else {
                    next()
                }
            })
            .catch(err => {
                next(err);
            })
        } else {
            next();
        }
    }
}

const authorizationCart = (req, res, next) => {
    let id = +req.params.id;

    Cart.findByPk(id)
    .then(data => {
        if (!data) {
            next({code: 404, message: 'Cart not found'})
        } else {
            if (data.UserId === req.currentUser.id) {
                next()
            } else {
                next({code: 403, message: 'Authorization error, this is other user cart'})
            }
        }
    })
    .catch(err => {
        next(err);
    })
}

module.exports = {authentication, authorizationProduct, authorizationBanner, authorizationCart};