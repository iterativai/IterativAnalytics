/**
 * User Service
 * Business logic for user operations
 */

import { eq } from 'drizzle-orm';
import { db, schema } from '../config/database.js';
import { InsertUser, User } from '../../shared/schema.js';
import { NotFoundError, ConflictError } from '../middleware/errorHandler.js';
import { logger } from '../config/logger.js';

export class UserService {
  /**
   * Create a new user
   */
  static async createUser(userData: InsertUser): Promise<User> {
    try {
      // Check if user already exists
      const existing = await db.getDb()
        .select()
        .from(schema.users)
        .where(eq(schema.users.username, userData.username))
        .limit(1);

      if (existing.length > 0) {
        throw new ConflictError('Username already exists');
      }

      const [user] = await db.getDb()
        .insert(schema.users)
        .values(userData)
        .returning();

      logger.info(`User created: ${user.username}`, { userId: user.id });
      return user;
    } catch (error) {
      logger.error('Error creating user', { error });
      throw error;
    }
  }

  /**
   * Get user by ID
   */
  static async getUserById(id: number): Promise<User> {
    try {
      const [user] = await db.getDb()
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, id))
        .limit(1);

      if (!user) {
        throw new NotFoundError('User not found');
      }

      return user;
    } catch (error) {
      logger.error('Error fetching user', { error, userId: id });
      throw error;
    }
  }

  /**
   * Get user by username
   */
  static async getUserByUsername(username: string): Promise<User> {
    try {
      const [user] = await db.getDb()
        .select()
        .from(schema.users)
        .where(eq(schema.users.username, username))
        .limit(1);

      if (!user) {
        throw new NotFoundError('User not found');
      }

      return user;
    } catch (error) {
      logger.error('Error fetching user by username', { error, username });
      throw error;
    }
  }

  /**
   * Get all users with optional filtering
   */
  static async getUsers(filters?: { userType?: string }): Promise<User[]> {
    try {
      if (filters?.userType) {
        return await db.getDb()
          .select()
          .from(schema.users)
          .where(eq(schema.users.userType, filters.userType));
      }

      return await db.getDb()
        .select()
        .from(schema.users);
    } catch (error) {
      logger.error('Error fetching users', { error });
      throw error;
    }
  }

  /**
   * Update user
   */
  static async updateUser(id: number, updates: Partial<InsertUser>): Promise<User> {
    try {
      const [user] = await db.getDb()
        .update(schema.users)
        .set(updates)
        .where(eq(schema.users.id, id))
        .returning();

      if (!user) {
        throw new NotFoundError('User not found');
      }

      logger.info(`User updated: ${user.username}`, { userId: user.id });
      return user;
    } catch (error) {
      logger.error('Error updating user', { error, userId: id });
      throw error;
    }
  }

  /**
   * Delete user
   */
  static async deleteUser(id: number): Promise<void> {
    try {
      const result = await db.getDb()
        .delete(schema.users)
        .where(eq(schema.users.id, id))
        .returning();

      if (result.length === 0) {
        throw new NotFoundError('User not found');
      }

      logger.info(`User deleted`, { userId: id });
    } catch (error) {
      logger.error('Error deleting user', { error, userId: id });
      throw error;
    }
  }
}
