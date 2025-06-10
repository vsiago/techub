import mongoose, { Types } from 'mongoose';
import { IUser } from '../types/User';

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Email inválido']
  },
  fullName: { type: String, required: false },

  role: {
    type: String,
    enum: ['admin', 'gerente', 'operador', 'vendedor', 'master', 'free', 'pro', 'enterprise'],
    default: 'free',
  },
  passwordHash: { type: String, required: true },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: function (this: IUser) {
      return ['admin', 'pro', 'enterprise'].includes(this.role);
    },
  },

  isActive: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model('User', userSchema);
