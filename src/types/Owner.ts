import mongoose from 'mongoose';

export interface Owner {
  fullName: string;
  email: string;
  phone?: string;
  cpfOuCnpj?: string;
  role?: 'admin' | 'gestor' | 'dono';
  userId?: mongoose.Types.ObjectId;
  passwordHash: string;
  passwordSalt?: string;
}
