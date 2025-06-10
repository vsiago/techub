// src/routes/tenant.routes.ts

import { Router } from 'express';
import * as tenantController from '../controllers/tenant.controller';

const router = Router();

// POST /tenants
router.post('/', tenantController.createTenant);

// GET /tenants
router.get('/', tenantController.getAllTenants);

// GET /tenants/:id
router.get('/:id', tenantController.getTenantById);

// PUT /tenants/:id
router.put('/:id', tenantController.updateTenant);

// DELETE /tenants/:id
router.delete('/:id', tenantController.deleteTenant);

export default router;
