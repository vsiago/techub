import TenantModel from '../models/Tenant';
import { ITenant } from '../types/Tenant';

export const createTenant = async (data: ITenant) => {
  const tenant = new TenantModel(data);
  return await tenant.save();
};

export const getAllTenants = async () => {
  return await TenantModel.find();
};

export const getTenantById = async (id: string) => {
  return await TenantModel.findById(id);
};

export const updateTenant = async (id: string, data: Partial<ITenant>) => {
  return await TenantModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTenant = async (id: string) => {
  return await TenantModel.findByIdAndDelete(id);
};
