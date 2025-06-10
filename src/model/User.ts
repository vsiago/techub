import mongoose from 'mongoose';
import { IUser } from '../types/User';

const userSchema = new mongoose.Schema<IUser>({
  tenantId: {
    type: String,
    required: true,
  },
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Email inválido']
  },
  phone: String,
  role: {
    type: String,
    enum: ['admin', 'gerente', 'operador', 'vendedor'],
    default: 'operador'
  },
  passwordHash: { type: String, required: true },
  passwordSalt: { type: String },

  // Permite desativar usuários sem excluir
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Índices para facilitar buscas por tenant e email
userSchema.index({ tenantId: 1, email: 1 });

export default mongoose.model('User', userSchema);
