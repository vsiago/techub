import TenantModel from '../model/Tenant';

export const getModulesByTenant = async (tenantId: string) => {
  const tenant = await TenantModel.findOne({ tenantId }).select('modulesEnabled');
  if (!tenant) throw new Error('Tenant não encontrado');
  return tenant.modulesEnabled;
};

export const updateModulesByTenant = async (tenantId: string, modules: any) => {
  const tenant = await TenantModel.findOneAndUpdate(
    { tenantId },
    { modulesEnabled: modules },
    { new: true }
  );
  if (!tenant) throw new Error('Tenant não encontrado');
  return tenant.modulesEnabled;
};
