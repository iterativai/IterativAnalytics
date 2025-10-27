/**
 * Routes Index
 * Central export point for all API routes
 */

import { Express } from 'express';
import userRoutes from './userRoutes.js';
import documentRoutes from './documentRoutes.js';
import analysisRoutes from './analysisRoutes.js';
import activityRoutes from './activityRoutes.js';

/**
 * Register all API routes
 */
export function registerRoutes(app: Express): void {
  const API_PREFIX = '/api';

  // Register route modules
  app.use(`${API_PREFIX}/users`, userRoutes);
  app.use(`${API_PREFIX}/documents`, documentRoutes);
  app.use(`${API_PREFIX}/analyses`, analysisRoutes);
  app.use(`${API_PREFIX}/activities`, activityRoutes);
}
