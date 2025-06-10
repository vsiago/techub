// controllers/tenant.controller.ts

import { Request, Response, NextFunction } from 'express';
import * as tenantService from '../services/tenant.service';

export const createTenant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tenant = await tenantService.createTenant(req.body);
    res.status(201).json(tenant);
  } catch (error: any) {
    console.error('❌ Erro ao criar tenant:', error);
    next(error);
  }
};

export const getAllTenants = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tenants = await tenantService.getAllTenants();
    res.status(200).json(tenants);
  } catch (error: any) {
    next(error);
  }
};

export const getTenantById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tenant = await tenantService.getTenantById(req.params.id);
    if (!tenant) {
      res.status(404).json({ error: 'Tenant not found' });
      return;
    }
    res.status(200).json(tenant);
  } catch (error: any) {
    next(error);
  }
};

export const updateTenant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedTenant = await tenantService.updateTenant(req.params.id, req.body);
    if (!updatedTenant) {
      res.status(404).json({ error: 'Tenant not found' });
      return;
    }
    res.status(200).json(updatedTenant);
  } catch (error: any) {
    next(error);
  }
};

export const deleteTenant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await tenantService.deleteTenant(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Tenant not found' });
      return;
    }
    res.status(204).send();
  } catch (error: any) {
    next(error);
  }
};
