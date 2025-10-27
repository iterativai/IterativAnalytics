/**
 * Database Configuration Module
 * Manages database connections and provides query interface
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from './environment.js';
import { logger } from './logger.js';
import * as schema from '../../shared/schema.js';

class DatabaseManager {
  private static instance: DatabaseManager;
  private client: postgres.Sql | null = null;
  private db: ReturnType<typeof drizzle> | null = null;
  private isConnected = false;

  private constructor() {}

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      logger.debug('Database already connected');
      return;
    }

    const databaseUrl = env.get('DATABASE_URL');
    
    if (!databaseUrl) {
      logger.warn('No DATABASE_URL provided, database features will be disabled');
      return;
    }

    try {
      this.client = postgres(databaseUrl, {
        max: 10,
        idle_timeout: 20,
        connect_timeout: 10,
      });

      this.db = drizzle(this.client, { schema });
      
      // Test connection
      await this.client`SELECT 1`;
      
      this.isConnected = true;
      logger.info('✅ Database connected successfully');
    } catch (error) {
      logger.error('Failed to connect to database', { error });
      throw new Error('Database connection failed');
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected || !this.client) {
      return;
    }

    try {
      await this.client.end();
      this.isConnected = false;
      this.client = null;
      this.db = null;
      logger.info('Database disconnected');
    } catch (error) {
      logger.error('Error disconnecting from database', { error });
      throw error;
    }
  }

  public getDb(): ReturnType<typeof drizzle> {
    if (!this.db) {
      throw new Error('Database not initialized. Call connect() first.');
    }
    return this.db;
  }

  public getClient(): postgres.Sql {
    if (!this.client) {
      throw new Error('Database client not initialized. Call connect() first.');
    }
    return this.client;
  }

  public isReady(): boolean {
    return this.isConnected;
  }
}

export const db = DatabaseManager.getInstance();
export { schema };
