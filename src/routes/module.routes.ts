import { Router } from 'express';
import {
  getEnabledModules,
  updateEnabledModules,
} from '../controllers/module.controller';
import { authMiddleware, isAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authMiddleware, getEnabledModules);
router.put('/', authMiddleware, isAdmin, updateEnabledModules);

export default router;
