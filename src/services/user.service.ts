import UserModel from '../model/User';
import bcrypt from 'bcrypt';

export const getUsersByTenant = async (tenantId: string) => {
  return UserModel.find({ tenantId }).select('-passwordHash');
};

export const createUser = async (tenantId: string, userData: any) => {
  const { email, password, role } = userData;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) throw new Error('Email já cadastrado');

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new UserModel({
    ...userData,
    passwordHash,
    tenantId
  });

  await user.save();
  return user;
};

export const updateUser = async (tenantId: string, userId: string, data: any) => {
  const user = await UserModel.findOneAndUpdate({ _id: userId, tenantId }, data, { new: true });
  if (!user) throw new Error('Usuário não encontrado');
  return user;
};

export const deleteUser = async (tenantId: string, userId: string) => {
  const user = await UserModel.findOneAndDelete({ _id: userId, tenantId });
  if (!user) throw new Error('Usuário não encontrado');
};
