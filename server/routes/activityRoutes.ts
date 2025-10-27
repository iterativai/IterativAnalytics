/**
 * Activity Routes
 * Defines HTTP routes for activity tracking operations
 */

import { Router } from 'express';
import { ActivityController } from '../controllers/activityController.js';
import { rateLimit } from '../middleware/security.js';

const router = Router();

// Apply rate limiting to activity routes
const activityRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Higher limit for activity tracking
});

router.use(activityRateLimit);

// Activity routes
router.post('/', ActivityController.createActivity);
router.get('/recent', ActivityController.getRecentActivities);
router.get('/:id', ActivityController.getActivityById);
router.get('/user/:userId', ActivityController.getUserActivities);
router.get('/document/:documentId', ActivityController.getDocumentActivities);
router.delete('/:id', ActivityController.deleteActivity);

export default router;
