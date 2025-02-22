const express = require('express');
const { registerUser, loginUser, updateUser, deleteUser, getUserDetails } = require('../controllers/userControllers');
const checkToken = require('../middleware/checkToken');
const router = express.Router();


router.post('/create',registerUser);
router.post('/login',loginUser);
router.put('/update/',checkToken,updateUser);
router.delete('/delete/:_id',checkToken,deleteUser);
router.get('/getUser',checkToken,getUserDetails);


module.exports = router