const BannerController = require('../controllers/bannerController');
const { authorizationBanner } = require('../middlewares/auth');
const router = require('express').Router();

router.post('/', authorizationBanner, BannerController.addBanner)
router.get('/', BannerController.fetchBanners)
router.get('/:id', authorizationBanner, BannerController.getSpesificBanner)
router.put('/:id', authorizationBanner,BannerController.editBanner)
router.delete('/:id', authorizationBanner, BannerController.deleteBanner)

module.exports = router;