/**
 * Analysis Service
 * Business logic for document analysis operations
 */

import { eq } from 'drizzle-orm';
import { db, schema } from '../config/database.js';
import { InsertAnalysis, Analysis } from '../../shared/schema.js';
import { NotFoundError } from '../middleware/errorHandler.js';
import { logger } from '../config/logger.js';

export class AnalysisService {
  /**
   * Create a new analysis
   */
  static async createAnalysis(analysisData: InsertAnalysis): Promise<Analysis> {
    try {
      const [analysis] = await db.getDb()
        .insert(schema.analyses)
        .values(analysisData)
        .returning();

      logger.info(`Analysis created for document`, { 
        analysisId: analysis.id,
        documentId: analysis.documentId,
        score: analysis.overallScore
      });
      
      return analysis;
    } catch (error) {
      logger.error('Error creating analysis', { error });
      throw error;
    }
  }

  /**
   * Get analysis by ID
   */
  static async getAnalysisById(id: number): Promise<Analysis> {
    try {
      const [analysis] = await db.getDb()
        .select()
        .from(schema.analyses)
        .where(eq(schema.analyses.id, id))
        .limit(1);

      if (!analysis) {
        throw new NotFoundError('Analysis not found');
      }

      return analysis;
    } catch (error) {
      logger.error('Error fetching analysis', { error, analysisId: id });
      throw error;
    }
  }

  /**
   * Get analysis by document ID
   */
  static async getAnalysisByDocumentId(documentId: number): Promise<Analysis | null> {
    try {
      const [analysis] = await db.getDb()
        .select()
        .from(schema.analyses)
        .where(eq(schema.analyses.documentId, documentId))
        .limit(1);

      return analysis || null;
    } catch (error) {
      logger.error('Error fetching analysis by document', { error, documentId });
      throw error;
    }
  }

  /**
   * Update analysis
   */
  static async updateAnalysis(id: number, updates: Partial<InsertAnalysis>): Promise<Analysis> {
    try {
      const [analysis] = await db.getDb()
        .update(schema.analyses)
        .set(updates)
        .where(eq(schema.analyses.id, id))
        .returning();

      if (!analysis) {
        throw new NotFoundError('Analysis not found');
      }

      logger.info(`Analysis updated`, { analysisId: analysis.id });
      return analysis;
    } catch (error) {
      logger.error('Error updating analysis', { error, analysisId: id });
      throw error;
    }
  }

  /**
   * Delete analysis
   */
  static async deleteAnalysis(id: number): Promise<void> {
    try {
      const result = await db.getDb()
        .delete(schema.analyses)
        .where(eq(schema.analyses.id, id))
        .returning();

      if (result.length === 0) {
        throw new NotFoundError('Analysis not found');
      }

      logger.info(`Analysis deleted`, { analysisId: id });
    } catch (error) {
      logger.error('Error deleting analysis', { error, analysisId: id });
      throw error;
    }
  }

  /**
   * Get all analyses
   */
  static async getAllAnalyses(): Promise<Analysis[]> {
    try {
      const analyses = await db.getDb()
        .select()
        .from(schema.analyses);

      return analyses;
    } catch (error) {
      logger.error('Error fetching all analyses', { error });
      throw error;
    }
  }
}
