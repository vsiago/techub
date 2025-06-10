// src/routes/index.ts

import { Router } from 'express';
import { authMiddleware, canManageTenants } from '../middlewares/auth.middleware';


// Rotas organizadas por módulos
import authRoutes from './auth.routes';
import tenantRoutes from './tenant.routes';
import userRoutes from './user.routes';
import moduleRoutes from './module.routes';

const router = Router();

// Rotas públicas
router.use('/auth', authRoutes); // Login, registro

// Rotas protegidas
router.use('/tenants', authMiddleware, canManageTenants, tenantRoutes); // Apenas master, pro, enterprise
router.use('/users', authMiddleware, userRoutes);        // Gestão de usuários
router.use('/modules', authMiddleware, moduleRoutes);    // Módulos por tenant

export default router;
