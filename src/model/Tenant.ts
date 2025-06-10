import mongoose from 'mongoose'
import { ITenant } from '../types/Tenant';
const tenantSchema = new mongoose.Schema<ITenant>({
  // Nome do tenant (empresa/cliente)
  name: { type: String, required: true },

  // Identificador único do tenant (pode ser usado em URLs, etc)
  tenantId: { type: String, unique: true, required: true },

  // Email principal de contato do tenant, com validação básica de formato
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "Email inválido"]
  },

  // URL do logo da empresa, pode ser usado para customização visual
  logoUrl: String,

  // Dados do proprietário/usuário principal do tenant
  owner: {
    fullName: { type: String, required: true }, // Nome completo do dono
    email: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/, "Email inválido"]  // Validação de email
    },
    phone: String, // Telefone de contato do dono
    cpfOuCnpj: {
      type: String,
      // Validação para CPF (11 dígitos) ou CNPJ (14 dígitos)
      match: [/^\d{11}$|^\d{14}$/, "CPF ou CNPJ inválido"]
    },
    role: {
      type: String,
      // Permite definir o papel do dono dentro do sistema
      enum: ["admin", "gestor", "dono"],
      default: "dono"
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"  // Referência ao usuário no sistema (autenticação)
    },

    // --- Login administrativo ---
    // Armazena o hash da senha para autenticação do dono
    passwordHash: { type: String, required: true },

    // (Opcional) Salt usado na criação do hash da senha
    passwordSalt: { type: String }
  },

  // Plano contratado pelo tenant, controla acesso a funcionalidades
  plan: {
    type: String,
    enum: ["free", "pro", "enterprise"],
    default: "free"
  },

  // Segmento de atuação do tenant, para categorização e customização
  segmento: {
    type: String,
    enum: [
      "academia", "contador", "mercadinho", "restaurante", "comercio",
      "salao", "petshop", "outro"
    ],
    required: true
  },

  // Controle dos módulos habilitados para o tenant
  modulesEnabled: {
    clientes: { type: Boolean, default: true },          // Módulo de gestão de clientes
    financeiro: { type: Boolean, default: true },        // Módulo financeiro
    rastreabilidade: { type: Boolean, default: true },   // Rastreamento (ex: pedidos, entregas)
    estoque: { type: Boolean, default: false },          // Gestão de estoque
    produtos: { type: Boolean, default: false },         // Cadastro de produtos
    agendamento: { type: Boolean, default: false },      // Sistema de agendamento
    servicos: { type: Boolean, default: false },         // Gestão de serviços
    customFeatures: {                                      // Recursos customizados adicionais
      type: Map,
      
      of: Boolean,
      default: {}
    }
  },

  // Customizações visuais do tenant para o UI
  customization: {
    primaryColor: String,         // Cor principal da interface
    secondaryColor: String,       // Cor secundária
    fontFamily: String,           // Fonte usada no app/site
    uiStyle: {                   // Estilo visual geral (borda arredondada, etc)
      type: String,
      enum: ["rounded", "sharp", "default"],
      default: "default"
    }
  },

  // Flag para ativar/desativar tenant (ex: suspenso, excluído)
  isActive: { type: Boolean, default: true }

}, { timestamps: true });  // Registra data de criação e atualização automaticamente

// Índices para melhorar performance nas buscas por tenantId, email e email do dono
tenantSchema.index({ email: 1 });
tenantSchema.index({ "owner.email": 1 });

export default mongoose.model("Tenant", tenantSchema);
