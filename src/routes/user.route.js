import express from 'express';
const router = express.Router();
import { jwtValidator } from '../middlewears/authentication.js';
import { userAuthValidator } from '../middlewears/validator.js';
import { register, login, OneUser, AllUser } from '../controllers/user.js';
import { createPost, userPosts } from '../controllers/post.js';

router.post('/register', userAuthValidator, register);
router.post('/login', userAuthValidator, login);
router.get('/user', jwtValidator, OneUser);
router.get('/allUser', jwtValidator, AllUser);


router.post('/post', jwtValidator, createPost);
router.get('/post', jwtValidator, userPosts);


export default router;