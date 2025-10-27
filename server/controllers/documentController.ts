/**
 * Document Controller
 * Handles HTTP requests for document operations
 */

import { Request, Response } from 'express';
import { DocumentService } from '../services/documentService.js';
import { insertDocumentSchema } from '../../shared/schema.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export class DocumentController {
  /**
   * Create a new document
   * POST /api/documents
   */
  static createDocument = asyncHandler(async (req: Request, res: Response) => {
    const documentData = insertDocumentSchema.parse(req.body);
    const document = await DocumentService.createDocument(documentData);

    res.status(201).json({
      status: 'success',
      data: {
        document,
      },
    });
  });

  /**
   * Get all documents
   * GET /api/documents
   */
  static getAllDocuments = asyncHandler(async (req: Request, res: Response) => {
    const documents = await DocumentService.getAllDocuments();

    res.status(200).json({
      status: 'success',
      data: {
        documents,
        count: documents.length,
      },
    });
  });

  /**
   * Get document by ID
   * GET /api/documents/:id
   */
  static getDocumentById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const document = await DocumentService.getDocumentById(id);

    res.status(200).json({
      status: 'success',
      data: {
        document,
      },
    });
  });

  /**
   * Get documents by user ID
   * GET /api/documents/user/:userId
   */
  static getUserDocuments = asyncHandler(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const documents = await DocumentService.getUserDocuments(userId);

    res.status(200).json({
      status: 'success',
      data: {
        documents,
        count: documents.length,
      },
    });
  });

  /**
   * Update document
   * PUT /api/documents/:id
   */
  static updateDocument = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updateSchema = insertDocumentSchema.partial();
    const updates = updateSchema.parse(req.body);

    const document = await DocumentService.updateDocument(id, updates);

    res.status(200).json({
      status: 'success',
      data: {
        document,
      },
    });
  });

  /**
   * Delete document
   * DELETE /api/documents/:id
   */
  static deleteDocument = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await DocumentService.deleteDocument(id);

    res.status(204).send();
  });
}
