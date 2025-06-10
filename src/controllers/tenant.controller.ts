import { Request, Response } from 'express';
import * as tenantService from '../services/tenant.service';

export const getTenantInfo = async (req: Request, res: Response) => {
  try {
    const tenantId = req.user.tenantId;
    const tenant = await tenantService.getTenantById(tenantId);
    res.json(tenant);
  } catch (error) {
    res.status(404).json({ message: 'Tenant não encontrado' });
  }
};

export const updateTenantInfo = async (req: Request, res: Response) => {
  try {
    const tenantId = req.user.tenantId;
    const updateData = req.body;
    const tenant = await tenantService.updateTenantById(tenantId, updateData);
    res.json(tenant);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar tenant' });
  }
};
