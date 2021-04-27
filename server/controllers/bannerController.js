const { Banner } = require('../models')

class BannerController {
    static addBanner (req, res, next) {
        let newBanner = {
            title: req.body.title,
            status: req.body.status,
            image_url: req.body.image_url,
            UserId: req.currentUser.id
        }

        Banner.create(newBanner)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            next(err);
        })
    }

    static fetchBanners (req, res, next) {
        Banner.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            next(err);
        })
    }

    static getSpesificBanner (req, res, next) {
        let id = +req.params.id

        Banner.findByPk(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err);
        })
    }

    static editBanner (req, res, next) {
        let id = +req.params.id
        let editedBanner = {
            title: req.body.title,
            status: req.body.status,
            image_url: req.body.image_url
        }

        Banner.update(editedBanner, {
            where: {
                id
            },
            returning: true
        })
        .then(data => {
            res.status(200).json(data[1][0]);
        })
        .catch(err => {
            next(err);
        })
    }

    static deleteBanner (req, res, next) {
        let id =+req.params.id

        Banner.destroy({
            where: {
                id
            }
        })
        .then(data => {
            res.status(200).json({ message: 'Success. Banner has been deleted' });
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = BannerController;