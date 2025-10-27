/**
 * User Routes
 * Defines HTTP routes for user operations
 */

import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { rateLimit } from '../middleware/security.js';

const router = Router();

// Apply rate limiting to user routes
const userRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

router.use(userRateLimit);

// User routes
router.post('/', UserController.createUser);
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.get('/username/:username', UserController.getUserByUsername);

export default router;
