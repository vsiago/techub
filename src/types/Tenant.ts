import { Document } from 'mongoose';
import { Owner } from './Owner';

export interface ITenant extends Document {
  name: string;
  tenantId: string;
  email: string;
  logoUrl?: string;
  owner: Owner;
  plan: 'free' | 'pro' | 'enterprise';
  segmento: 
    | 'academia' 
    | 'contador' 
    | 'mercadinho' 
    | 'restaurante' 
    | 'comercio' 
    | 'salao' 
    | 'petshop' 
    | 'outro';
  modulesEnabled: {
    clientes: boolean;
    financeiro: boolean;
    rastreabilidade: boolean;
    estoque: boolean;
    produtos: boolean;
    agendamento: boolean;
    servicos: boolean;
    customFeatures: Map<string, boolean>;
  };
  customization: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
    uiStyle: 'rounded' | 'sharp' | 'default';
  };
  isActive: boolean;
}
