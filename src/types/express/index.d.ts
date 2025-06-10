import { JwtPayload } from '../../middleware/auth.middleware'; // ou defina aqui mesmo

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        tenantId: string;
        role?: string;
      };
    }
  }
}
