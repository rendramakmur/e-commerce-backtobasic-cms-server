const e = require('express')
const { Cart, Product } = require('../models')

class CartController {
    static addCart (req, res, next) {
        let productId = +req.params.productId

        Cart.findAll({
            where: {
                UserId: req.currentUser.id,
                ProductId: productId
            },
            include: Product
        })
        .then(data => {
            if (data.length === 0) {
                return Cart.create({
                    UserId: req.currentUser.id,
                    ProductId: productId
                })
            } else {
                const quantity = data[0].quantity
                const stock = data[0].Product.stock
                const cartId = data[0].id
                if (quantity < stock) {
                    return Cart.increment('quantity', {
                        by: 1,
                        where: {
                            id: cartId,
                            UserId: req.currentUser.id
                        }
                    })
                } else {
                    res.status(400).json({ message: `Stock left for this product is ${stock}` })
                }
            }
        })
        .then(data => {
            if (Array.isArray(data)) {
                res.status(200).json(data[0][0][0])
            } else {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            if (err.name === 'SequelizeForeignKeyConstraintError') {
                next({code: 404, message: 'Product not found'})
            } else {
                next(err)
            }
        })
    }

    static fetchCarts (req, res, next) {
        Cart.findAll({
            where: {
                UserId: req.currentUser.id
            },
            include: {
                model: Product,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'UserId']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static setCartQuantity (req, res, next) {
        let id = +req.params.id
        let newQuantity = req.body.quantity

        Cart.findByPk(id, {
            include: {
                model: Product,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'UserId']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        .then(data => {
            if (data.Product.stock >= newQuantity) {
                return Cart.update({
                    quantity: newQuantity
                }, {
                    where: {
                        id
                    },
                    returning: true
                })
            } else {
                next({code: 400, message: `Current stock left is ${data.Product.stock}`})
            }
        })
        .then(data => {
            res.status(200).json(data[1][0])
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteCart (req, res, next) {
        let id = +req.params.id

        Cart.destroy({
            where: {
                id
            }
        })
        .then(data => {
            res.status(200).json({ message: 'Success. Cart has been deleted.' })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = CartController