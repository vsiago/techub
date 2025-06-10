// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  tenantId: string;
  role: string;
}

// Extendendo o tipo do Request para incluir user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'seusecret';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Token não fornecido' });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token mal formatado' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

// Middleware para verificar roles permitidos
export const permitRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Usuário não autenticado' });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ message: 'Acesso negado' });
      return;
    }

    next();
  };
};

// Middleware específico para admin
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ message: 'Usuário não autenticado' });
    return;
  }

  if (req.user.role !== 'admin') {
    res.status(403).json({ message: 'Apenas administradores têm acesso' });
    return;
  }

  next();
};

// Middleware para admin ou gerente
export const isAdminOrManager = permitRoles('admin', 'manager');

// Middleware para master, pro e enterprise (controle de tenants)
export const canManageTenants = permitRoles('master', 'pro', 'enterprise');
