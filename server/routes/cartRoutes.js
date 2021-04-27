const CartController = require('../controllers/cartController')
const { authorizationCart } = require('../middlewares/auth')
const router = require('express').Router()

router.get('/', CartController.fetchCarts)
router.post('/:productId', CartController.addCart)
router.patch('/:id', authorizationCart, CartController.setCartQuantity)
router.delete('/:id', authorizationCart, CartController.deleteCart)

module.exports = router