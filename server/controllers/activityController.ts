/**
 * Activity Controller
 * Handles HTTP requests for activity tracking operations
 */

import { Request, Response } from 'express';
import { ActivityService } from '../services/activityService.js';
import { insertActivitySchema } from '../../shared/schema.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export class ActivityController {
  /**
   * Create a new activity
   * POST /api/activities
   */
  static createActivity = asyncHandler(async (req: Request, res: Response) => {
    const activityData = insertActivitySchema.parse(req.body);
    const activity = await ActivityService.createActivity(activityData);

    res.status(201).json({
      status: 'success',
      data: {
        activity,
      },
    });
  });

  /**
   * Get activity by ID
   * GET /api/activities/:id
   */
  static getActivityById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const activity = await ActivityService.getActivityById(id);

    res.status(200).json({
      status: 'success',
      data: {
        activity,
      },
    });
  });

  /**
   * Get activities by user ID
   * GET /api/activities/user/:userId
   */
  static getUserActivities = asyncHandler(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const activities = await ActivityService.getUserActivities(userId, limit);

    res.status(200).json({
      status: 'success',
      data: {
        activities,
        count: activities.length,
      },
    });
  });

  /**
   * Get activities by document ID
   * GET /api/activities/document/:documentId
   */
  static getDocumentActivities = asyncHandler(async (req: Request, res: Response) => {
    const documentId = parseInt(req.params.documentId);
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const activities = await ActivityService.getDocumentActivities(documentId, limit);

    res.status(200).json({
      status: 'success',
      data: {
        activities,
        count: activities.length,
      },
    });
  });

  /**
   * Get recent activities
   * GET /api/activities/recent
   */
  static getRecentActivities = asyncHandler(async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const activities = await ActivityService.getRecentActivities(limit);

    res.status(200).json({
      status: 'success',
      data: {
        activities,
        count: activities.length,
      },
    });
  });

  /**
   * Delete activity
   * DELETE /api/activities/:id
   */
  static deleteActivity = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await ActivityService.deleteActivity(id);

    res.status(204).send();
  });
}
