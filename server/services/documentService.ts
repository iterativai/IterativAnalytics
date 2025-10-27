/**
 * Document Service
 * Business logic for document operations
 */

import { eq, desc } from 'drizzle-orm';
import { db, schema } from '../config/database.js';
import { InsertDocument, Document } from '../../shared/schema.js';
import { NotFoundError } from '../middleware/errorHandler.js';
import { logger } from '../config/logger.js';

export class DocumentService {
  /**
   * Create a new document
   */
  static async createDocument(documentData: InsertDocument): Promise<Document> {
    try {
      const [document] = await db.getDb()
        .insert(schema.documents)
        .values(documentData)
        .returning();

      logger.info(`Document created: ${document.title}`, { documentId: document.id });
      return document;
    } catch (error) {
      logger.error('Error creating document', { error });
      throw error;
    }
  }

  /**
   * Get document by ID
   */
  static async getDocumentById(id: number): Promise<Document> {
    try {
      const [document] = await db.getDb()
        .select()
        .from(schema.documents)
        .where(eq(schema.documents.id, id))
        .limit(1);

      if (!document) {
        throw new NotFoundError('Document not found');
      }

      return document;
    } catch (error) {
      logger.error('Error fetching document', { error, documentId: id });
      throw error;
    }
  }

  /**
   * Get all documents for a user
   */
  static async getUserDocuments(userId: number): Promise<Document[]> {
    try {
      const documents = await db.getDb()
        .select()
        .from(schema.documents)
        .where(eq(schema.documents.userId, userId))
        .orderBy(desc(schema.documents.createdAt));

      return documents;
    } catch (error) {
      logger.error('Error fetching user documents', { error, userId });
      throw error;
    }
  }

  /**
   * Update document
   */
  static async updateDocument(id: number, updates: Partial<InsertDocument>): Promise<Document> {
    try {
      const [document] = await db.getDb()
        .update(schema.documents)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(schema.documents.id, id))
        .returning();

      if (!document) {
        throw new NotFoundError('Document not found');
      }

      logger.info(`Document updated: ${document.title}`, { documentId: document.id });
      return document;
    } catch (error) {
      logger.error('Error updating document', { error, documentId: id });
      throw error;
    }
  }

  /**
   * Delete document
   */
  static async deleteDocument(id: number): Promise<void> {
    try {
      const result = await db.getDb()
        .delete(schema.documents)
        .where(eq(schema.documents.id, id))
        .returning();

      if (result.length === 0) {
        throw new NotFoundError('Document not found');
      }

      logger.info(`Document deleted`, { documentId: id });
    } catch (error) {
      logger.error('Error deleting document', { error, documentId: id });
      throw error;
    }
  }

  /**
   * Get all documents
   */
  static async getAllDocuments(): Promise<Document[]> {
    try {
      const documents = await db.getDb()
        .select()
        .from(schema.documents)
        .orderBy(desc(schema.documents.createdAt));

      return documents;
    } catch (error) {
      logger.error('Error fetching all documents', { error });
      throw error;
    }
  }
}
