import mongoose from 'mongoose';

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  segmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Segment',
    required: true
  },

  modulesEnabled: {
    clientes: { type: Boolean, default: true },
    financeiro: { type: Boolean, default: true },
    rastreabilidade: { type: Boolean, default: true },
    estoque: { type: Boolean, default: false },
    produtos: { type: Boolean, default: false },
    agendamento: { type: Boolean, default: false },
    servicos: { type: Boolean, default: false },
    customFeatures: {
      type: Map,
      of: Boolean,
      default: {}
    }
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Tenant', tenantSchema);
