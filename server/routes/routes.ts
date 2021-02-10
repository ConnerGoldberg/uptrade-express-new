import * as express from 'express';
import { userController, customersController } from '../controllers/userController';
import { register } from '../controllers/authController';

const router = express.Router();

router.get('/api/users', userController);

router.post('/api/register', register);

router.get('/api/customers', customersController);

module.exports = router;
