const { Product } = require('../models')

class ProductController {
    static createProduct(req, res, next) {
        let newProduct = {
            name: req.body.name,
            category: req.body.category,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock,
            UserId: req.currentUser.id
        }

        Product.create(newProduct)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            next(err)
        })
    }

    static fetchProducts(req, res, next) {
        Product.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static getSpesificProduct(req, res, next) {
        let id = +req.params.id;

        Product.findByPk(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            next(err)
        })
    }

    static editProduct (req, res, next) {
        let id = +req.params.id;
        let editedProduct = {
            name: req.body.name,
            category: req.body.category,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock
        }

        Product.update(editedProduct, {
            where: {
                id
            },
            returning: true
        })
        .then(data => {
            res.status(200).json(data[1][0])
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteProduct (req, res, next) {
        let id = +req.params.id;

        Product.destroy({
            where: {
                id
            }
        })
        .then(data => {
            res.status(200).json({ message: 'Success. Product has been deleted' })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProductController;