import UserModel from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const login = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('Usuário não encontrado');

  if (!user.passwordHash) {
    throw new Error('Usuário sem senha cadastrada');
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) throw new Error('Senha inválida');

  const token = jwt.sign(
    { userId: user._id, tenantId: user.tenantId, role: user.role },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  return token;
};

export const register = async (userData: any) => {
  const { email, password, tenantId, role } = userData;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) throw new Error('Email já cadastrado');

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new UserModel({
    email,
    passwordHash,
    tenantId,
    role
  });

  await user.save();
  return { id: user._id, email: user.email, tenantId: user.tenantId, role: user.role };
};
