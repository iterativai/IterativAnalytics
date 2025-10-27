/**
 * Activity Service
 * Business logic for tracking user activities
 */

import { eq, desc } from 'drizzle-orm';
import { db, schema } from '../config/database.js';
import { InsertActivity, Activity } from '../../shared/schema.js';
import { NotFoundError } from '../middleware/errorHandler.js';
import { logger } from '../config/logger.js';

export class ActivityService {
  /**
   * Create a new activity
   */
  static async createActivity(activityData: InsertActivity): Promise<Activity> {
    try {
      const [activity] = await db.getDb()
        .insert(schema.activities)
        .values(activityData)
        .returning();

      logger.debug(`Activity logged: ${activity.activityType}`, { 
        activityId: activity.id,
        userId: activity.userId,
        documentId: activity.documentId
      });
      
      return activity;
    } catch (error) {
      logger.error('Error creating activity', { error });
      throw error;
    }
  }

  /**
   * Get activity by ID
   */
  static async getActivityById(id: number): Promise<Activity> {
    try {
      const [activity] = await db.getDb()
        .select()
        .from(schema.activities)
        .where(eq(schema.activities.id, id))
        .limit(1);

      if (!activity) {
        throw new NotFoundError('Activity not found');
      }

      return activity;
    } catch (error) {
      logger.error('Error fetching activity', { error, activityId: id });
      throw error;
    }
  }

  /**
   * Get activities by user ID
   */
  static async getUserActivities(userId: number, limit: number = 50): Promise<Activity[]> {
    try {
      const activities = await db.getDb()
        .select()
        .from(schema.activities)
        .where(eq(schema.activities.userId, userId))
        .orderBy(desc(schema.activities.createdAt))
        .limit(limit);

      return activities;
    } catch (error) {
      logger.error('Error fetching user activities', { error, userId });
      throw error;
    }
  }

  /**
   * Get activities by document ID
   */
  static async getDocumentActivities(documentId: number, limit: number = 50): Promise<Activity[]> {
    try {
      const activities = await db.getDb()
        .select()
        .from(schema.activities)
        .where(eq(schema.activities.documentId, documentId))
        .orderBy(desc(schema.activities.createdAt))
        .limit(limit);

      return activities;
    } catch (error) {
      logger.error('Error fetching document activities', { error, documentId });
      throw error;
    }
  }

  /**
   * Get recent activities
   */
  static async getRecentActivities(limit: number = 50): Promise<Activity[]> {
    try {
      const activities = await db.getDb()
        .select()
        .from(schema.activities)
        .orderBy(desc(schema.activities.createdAt))
        .limit(limit);

      return activities;
    } catch (error) {
      logger.error('Error fetching recent activities', { error });
      throw error;
    }
  }

  /**
   * Delete activity
   */
  static async deleteActivity(id: number): Promise<void> {
    try {
      const result = await db.getDb()
        .delete(schema.activities)
        .where(eq(schema.activities.id, id))
        .returning();

      if (result.length === 0) {
        throw new NotFoundError('Activity not found');
      }

      logger.debug(`Activity deleted`, { activityId: id });
    } catch (error) {
      logger.error('Error deleting activity', { error, activityId: id });
      throw error;
    }
  }
}
