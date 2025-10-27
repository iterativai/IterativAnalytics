/**
 * User Controller
 * Handles HTTP requests for user operations
 */

import { Request, Response } from 'express';
import { UserService } from '../services/userService.js';
import { insertUserSchema } from '../../shared/schema.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { z } from 'zod';

export class UserController {
  /**
   * Create a new user
   * POST /api/users
   */
  static createUser = asyncHandler(async (req: Request, res: Response) => {
    const userData = insertUserSchema.parse(req.body);
    const user = await UserService.createUser(userData);

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          ...user,
          password: undefined, // Don't send password in response
        },
      },
    });
  });

  /**
   * Get all users
   * GET /api/users
   */
  static getUsers = asyncHandler(async (req: Request, res: Response) => {
    const { userType } = req.query;
    const users = await UserService.getUsers({
      userType: userType as string | undefined,
    });

    res.status(200).json({
      status: 'success',
      data: {
        users: users.map(user => ({
          ...user,
          password: undefined, // Don't send passwords
        })),
        count: users.length,
      },
    });
  });

  /**
   * Get user by ID
   * GET /api/users/:id
   */
  static getUserById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = await UserService.getUserById(id);

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          ...user,
          password: undefined, // Don't send password
        },
      },
    });
  });

  /**
   * Update user
   * PUT /api/users/:id
   */
  static updateUser = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updateSchema = insertUserSchema.partial();
    const updates = updateSchema.parse(req.body);

    const user = await UserService.updateUser(id, updates);

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          ...user,
          password: undefined, // Don't send password
        },
      },
    });
  });

  /**
   * Delete user
   * DELETE /api/users/:id
   */
  static deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await UserService.deleteUser(id);

    res.status(204).send();
  });

  /**
   * Get user by username
   * GET /api/users/username/:username
   */
  static getUserByUsername = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;
    const user = await UserService.getUserByUsername(username);

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          ...user,
          password: undefined, // Don't send password
        },
      },
    });
  });
}
