const { Product } = require('../models');

const revertProduct = () => {
    return Product.destory({ where: {} })
}

module.exports = revertProduct;