const express = require('express');
const router = express.Router();

const { getAllProducts, getOneProduct, addProduct, updateProduct,deleteProduct} = require('../services/productService')

router.get("/getall", getAllProducts); //Working
router.get("/getone/:id", getOneProduct); //Working
router.post("/add", addProduct); //working
router.put("update/:id", updateProduct);
router.delete("delete/:id", deleteProduct);

module.exports = router;