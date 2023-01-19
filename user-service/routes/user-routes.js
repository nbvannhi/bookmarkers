const express = require('express');
const { signUp, verifyEmail, signIn, verifyToken, getUser, getUserById, searchUsers, refreshToken, signOut } = require('../controllers/user-controller');

const router = express.Router();

router.post('/signup', signUp);
router.get('/verifyemail/:token', verifyEmail);
router.post('/signin', signIn);
router.post('/signout', verifyToken, signOut);
router.get('/user', verifyToken, getUser);
router.get('/user/:id', getUserById);
router.get('/refresh', refreshToken, verifyToken, getUser);
router.get('/users/:id', searchUsers);

module.exports = router;
