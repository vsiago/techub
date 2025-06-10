import { Request, Response } from 'express';
import * as moduleService from '../services/module.service';

// Pega os módulos habilitados para o tenant
export const getEnabledModules = async (req: Request, res: Response) => {
  try {
    const tenantId = req.user!.tenantId; // vem do middleware auth
    const modules = await moduleService.getModulesByTenant(tenantId);
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar módulos', error });
  }
};

// Atualiza os módulos habilitados para o tenant (admin only)
export const updateEnabledModules = async (req: Request, res: Response) => {
  try {
    const tenantId = req.user!.tenantId;
    const updatedModules = req.body.modules;

    const result = await moduleService.updateModulesByTenant(tenantId, updatedModules);
    res.json({ message: 'Módulos atualizados', modules: result });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar módulos', error });
  }
};
