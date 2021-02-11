import * as express from 'express';
import { allUsers, customersController, userById } from '../controllers/userController';
import { register, login } from '../controllers/authController';

const router = express.Router();

router.get('/api/users', allUsers);

router.get('/api/user/:id', userById);

router.post('/api/register', register);
router.post('/api/login', login);

router.get('/api/customers', customersController);

module.exports = router;
