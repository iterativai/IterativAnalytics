/**
 * Analysis Controller
 * Handles HTTP requests for analysis operations
 */

import { Request, Response } from 'express';
import { AnalysisService } from '../services/analysisService.js';
import { insertAnalysisSchema } from '../../shared/schema.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export class AnalysisController {
  /**
   * Create a new analysis
   * POST /api/analyses
   */
  static createAnalysis = asyncHandler(async (req: Request, res: Response) => {
    const analysisData = insertAnalysisSchema.parse(req.body);
    const analysis = await AnalysisService.createAnalysis(analysisData);

    res.status(201).json({
      status: 'success',
      data: {
        analysis,
      },
    });
  });

  /**
   * Get all analyses
   * GET /api/analyses
   */
  static getAllAnalyses = asyncHandler(async (req: Request, res: Response) => {
    const analyses = await AnalysisService.getAllAnalyses();

    res.status(200).json({
      status: 'success',
      data: {
        analyses,
        count: analyses.length,
      },
    });
  });

  /**
   * Get analysis by ID
   * GET /api/analyses/:id
   */
  static getAnalysisById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const analysis = await AnalysisService.getAnalysisById(id);

    res.status(200).json({
      status: 'success',
      data: {
        analysis,
      },
    });
  });

  /**
   * Get analysis by document ID
   * GET /api/analyses/document/:documentId
   */
  static getAnalysisByDocumentId = asyncHandler(async (req: Request, res: Response) => {
    const documentId = parseInt(req.params.documentId);
    const analysis = await AnalysisService.getAnalysisByDocumentId(documentId);

    res.status(200).json({
      status: 'success',
      data: {
        analysis,
      },
    });
  });

  /**
   * Update analysis
   * PUT /api/analyses/:id
   */
  static updateAnalysis = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updateSchema = insertAnalysisSchema.partial();
    const updates = updateSchema.parse(req.body);

    const analysis = await AnalysisService.updateAnalysis(id, updates);

    res.status(200).json({
      status: 'success',
      data: {
        analysis,
      },
    });
  });

  /**
   * Delete analysis
   * DELETE /api/analyses/:id
   */
  static deleteAnalysis = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await AnalysisService.deleteAnalysis(id);

    res.status(204).send();
  });
}
