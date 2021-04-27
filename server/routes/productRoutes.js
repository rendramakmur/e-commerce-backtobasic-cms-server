const ProductController = require('../controllers/productController');
const { authorizationProduct } = require('../middlewares/auth');
const router = require('express').Router();

router.post('/', authorizationProduct, ProductController.createProduct);
router.get('/:id', authorizationProduct, ProductController.getSpesificProduct);
router.put('/:id', authorizationProduct, ProductController.editProduct);
router.delete('/:id', authorizationProduct, ProductController.deleteProduct);

module.exports = router;