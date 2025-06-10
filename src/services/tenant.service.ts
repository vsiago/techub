import TenantModel from '../model/Tenant';

export const getTenantById = async (tenantId: string) => {
  const tenant = await TenantModel.findOne({ tenantId }).select('-passwordHash -passwordSalt');
  if (!tenant) throw new Error('Tenant não encontrado');
  return tenant;
};

export const updateTenantById = async (tenantId: string, data: any) => {
  const tenant = await TenantModel.findOneAndUpdate({ tenantId }, data, { new: true });
  if (!tenant) throw new Error('Tenant não encontrado');
  return tenant;
};
