import { Request, Response, NextFunction } from 'express';

export const injectTenantId = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;

  if (!user || !user.tenantId) {
    return res.status(400).json({ message: 'Tenant ID não encontrado no token' });
  }

  (req as any).tenantId = user.tenantId; // injeta req.tenantId diretamente
  next();
};
