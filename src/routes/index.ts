import { Router } from 'express';

// Rotas organizadas por módulos
import authRoutes from './auth.routes';
import tenantRoutes from './tenant.routes';
import userRoutes from './user.routes';
import moduleRoutes from './module.routes';

const router = Router();

// Prefixo comum para todas as rotas da API
router.use('/auth', authRoutes);         // Login, registro, troca de senha
router.use('/tenants', tenantRoutes);    // Gestão de tenants
router.use('/users', userRoutes);        // Gestão de usuários do tenant
router.use('/modules', moduleRoutes);    // Módulos ativados por segmento/tenant

export default router;
