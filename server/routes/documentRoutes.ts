/**
 * Document Routes
 * Defines HTTP routes for document operations
 */

import { Router } from 'express';
import { DocumentController } from '../controllers/documentController.js';
import { rateLimit } from '../middleware/security.js';

const router = Router();

// Apply rate limiting to document routes
const documentRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

router.use(documentRateLimit);

// Document routes
router.post('/', DocumentController.createDocument);
router.get('/', DocumentController.getAllDocuments);
router.get('/:id', DocumentController.getDocumentById);
router.get('/user/:userId', DocumentController.getUserDocuments);
router.put('/:id', DocumentController.updateDocument);
router.delete('/:id', DocumentController.deleteDocument);

export default router;
