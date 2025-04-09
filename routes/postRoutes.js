const express = require('express');
const checkToken = require('../middleware/checkToken');
const { createPost, getSeeds, fertilizers, Pesticides, updatePost, deletePost, getAll, searchUser } = require('../controllers/postControllers');
const router = express.Router();

router.post('/creates',checkToken,createPost);
router.get('/getSeed',getSeeds);
router.get('/getFertilizers',fertilizers);
router.get('/getPesticides',Pesticides);
router.put('/update/:_id',checkToken,updatePost);
router.delete('/delete/:_id',checkToken,deletePost);
router.get('/getAll',getAll);
router.get('/search',searchUser)


module.exports = router