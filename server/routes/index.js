const router = require('express').Router();
const user = require('./userRoutes');
const product = require('./productRoutes');
const banner = require('./bannerRoutes');
const cart = require('./cartRoutes')
const {authentication} = require('../middlewares/auth');
const ProductController = require('../controllers/productController');
const BannerController = require('../controllers/bannerController');

router.get('/', (req, res) => {
    res.send('Welcome to Back to Basic REST API');
})

router.use(user)
router.get('/products', ProductController.fetchProducts);
router.get('/banners', BannerController.fetchBanners);

router.use(authentication);

router.use('/products', product)
router.use('/banners', banner)
router.use('/carts', cart)

module.exports = router;