import * as express from 'express';
import { allUsers, customersController, userById } from '../controllers/userController';
import { register, login, authenticate, getUserDetail, logout } from '../controllers/authController';

const router = express.Router();

router.get('/api/users', allUsers);

router.get('/api/user/:id', authenticate, userById);
router.get('/api/authenticate/user', authenticate, getUserDetail);

router.post('/api/register', register);
router.post('/api/login', login);
router.post('/api/logout', logout);
router.get('/api/customers', customersController);

module.exports = router;
