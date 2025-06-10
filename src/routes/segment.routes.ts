import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import * as segmentController from '../controllers/segment-controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.use(authMiddleware);

router.post('/', asyncHandler(segmentController.createSegment));
router.get('/', asyncHandler(segmentController.getAllSegments));
router.get('/:id', asyncHandler(segmentController.getSegmentById));
router.put('/:id', asyncHandler(segmentController.updateSegment));
router.delete('/:id', asyncHandler(segmentController.deleteSegment));

export default router;
