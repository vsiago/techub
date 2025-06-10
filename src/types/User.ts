import { Types } from 'mongoose';

export interface IUser {
  _id?: string;
  tenantId?: Types.ObjectId; // <-- aqui estava como string
  fullName?: string; // tornar opcional para Master e Free
  email: string;
  phone?: string;
  role: 'admin' | 'gerente' | 'operador' | 'vendedor' | 'master' | 'free' | 'pro' | 'enterprise';
  passwordHash?: string;
  passwordSalt?: string;
  password?: string; // campo usado apenas no registro/login
  isActive?: boolean;
}
