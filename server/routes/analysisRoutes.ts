/**
 * Analysis Routes
 * Defines HTTP routes for analysis operations
 */

import { Router } from 'express';
import { AnalysisController } from '../controllers/analysisController.js';
import { rateLimit } from '../middleware/security.js';

const router = Router();

// Apply rate limiting to analysis routes
const analysisRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

router.use(analysisRateLimit);

// Analysis routes
router.post('/', AnalysisController.createAnalysis);
router.get('/', AnalysisController.getAllAnalyses);
router.get('/:id', AnalysisController.getAnalysisById);
router.get('/document/:documentId', AnalysisController.getAnalysisByDocumentId);
router.put('/:id', AnalysisController.updateAnalysis);
router.delete('/:id', AnalysisController.deleteAnalysis);

export default router;
