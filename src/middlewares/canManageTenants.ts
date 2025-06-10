// middlewares/canManageTenants.ts
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const canManageTenants = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user; // assumindo que foi setado no auth middleware

    if (!user) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    const allowedRoles = ['master', 'pro', 'enterprise'];

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Permissão negada. Acesso restrito ao gerenciamento de tenants.' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno de autorização.' });
  }
};
