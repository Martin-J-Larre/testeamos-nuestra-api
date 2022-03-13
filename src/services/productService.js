const productController = require('../controllers/productController');

    // get all products
    const getAllProducts = (req, res) => {
        productController.getAll(function(err, products) {
            if (err) {
                throw new Error(err)
            }
            res.json(products)
        })
    }

    // get one product
    const getOneProduct = (req, res) => {
        productController.getOne(req.params.id, function(err, product) {
            if (err) {
                throw new Error(err)
            }
            res.json(product)
        })
    }

    // add one product
    const addProduct = (req, res) => {
        productController.add(req.body, function(err, product) {
            if (err) {
                throw new Error(err)
            }
            res.json(product)
        })
    }

    // update Product
    const updateProduct = (req, res) => {
        productController.updateItem(
            req.params.id,
            req.body,
            function (err, product) {
                if (err) {
                    throw new Error(err)
                }
                res.json(product)
            }
        )
    }

    // delete product
    const deleteProduct = (req, res) => {
        productController.borrarItem(req.params.id, function(err) {
            if (err) {
                throw new Error(err)
            }
            res.send("Product deleted")
        })
    }



module.exports = {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct
};