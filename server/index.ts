/**
 * Server Entry Point
 * Initializes and configures the Express application
 */

import express, { Express } from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { env } from "./config/environment.js";
import { logger } from "./config/logger.js";
import { db } from "./config/database.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { securityHeaders, corsConfig } from "./middleware/security.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { registerRoutes } from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Create and configure Express application
 */
function createApp(): Express {
  const app = express();

  // Trust proxy (for deployment behind reverse proxies)
  app.set('trust proxy', 1);

  // Security middleware
  app.use(securityHeaders);
  app.use(cors(corsConfig));

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Request logging
  if (!env.isTest()) {
    app.use(requestLogger);
  }

  // Health check endpoint
  app.get("/health", (_req, res) => {
    res.status(200).json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: env.get('NODE_ENV'),
      database: db.isReady() ? 'connected' : 'disconnected',
    });
  });

  // API routes
  registerRoutes(app);

  // Serve static files from built client
  const distPublic = path.resolve(__dirname, "public");
  app.use(express.static(distPublic));

  // SPA fallback to index.html (must be after API routes)
  app.get("*", (_req, res, next) => {
    // Only serve index.html for non-API routes
    if (_req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.resolve(distPublic, "index.html"));
  });

  // Error handlers (must be last)
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

/**
 * Initialize database and start server
 */
async function startServer(): Promise<void> {
  try {
    // Initialize database connection
    await db.connect();

    // Create Express app
    const app = createApp();

    // Get port from environment
    const port = env.get('PORT');

    // Start server
    const server = app.listen(port, "0.0.0.0", () => {
      logger.info(`✨ Server running on port ${port}`);
      logger.info(`🌍 Environment: ${env.get('NODE_ENV')}`);
      logger.info(`🔗 API: http://localhost:${port}/api`);
      logger.info(`💻 Client: http://localhost:${port}`);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      logger.info(`${signal} received. Starting graceful shutdown...`);
      
      server.close(async () => {
        logger.info('HTTP server closed');
        
        try {
          await db.disconnect();
          logger.info('Database disconnected');
          process.exit(0);
        } catch (error) {
          logger.error('Error during shutdown', { error });
          process.exit(1);
        }
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    // Handle shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught errors
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception', { error });
      process.exit(1);
    });

    process.on('unhandledRejection', (reason) => {
      logger.error('Unhandled Rejection', { reason });
      process.exit(1);
    });

  } catch (error) {
    logger.error('Failed to start server', { error });
    process.exit(1);
  }
}

// Start the server
startServer();
