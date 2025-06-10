export interface IUser {
  _id?: string;
  tenantId: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'admin' | 'gerente' | 'operador' | 'vendedor';
  passwordHash: string;
  passwordSalt?: string;
  isActive: boolean;
}
