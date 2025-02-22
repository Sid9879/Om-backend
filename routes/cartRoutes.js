const express = require('express');
const checkToken = require('../middleware/checkToken');
const {cartDetails, updateCart, deletePost, getallCartItems, updateAddress } = require('../controllers/cartControllers');
const router = express.Router();

router.post('/addCart/:_productId',checkToken,cartDetails);
router.put('/update/:_productId',checkToken,updateCart);
router.delete('/delete/:_productId',checkToken,deletePost,);
router.get('/getcartItems',checkToken,getallCartItems);
router.put('/updateadd',checkToken,updateAddress)

module.exports = router