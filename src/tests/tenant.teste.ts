// tests/tenant.test.ts

import { api } from './setup';


let tenantId: string;

describe('CRUD de Tenant', () => {

  it('deve criar um novo tenant', async () => {
    const res = await api.post('/api/tenants').send({
      name: 'Test Company',
      tenantId: 'test-company',
      email: 'empresa@example.com',
      segmento: 'comercio',
      owner: {
        fullName: 'Dono da Empresa',
        email: 'dono@example.com',
        passwordHash: 'hashqualquer123',
        cpfOuCnpj: '12345678901'
      }
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
  }, 15000); // <-- timeout de 15 segundos

  it('deve listar todos os tenants', async () => {
    const res = await api.get('/api/tenants');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve buscar um tenant pelo ID', async () => {
    const res = await api.get(`/api/tenants/${tenantId!}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(tenantId!);
  });

  it('deve atualizar um tenant existente', async () => {
    const res = await api.put(`/api/tenants/${tenantId!}`).send({ name: 'Updated Company' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated Company');
  });

  it('deve deletar um tenant', async () => {
    const res = await api.delete(`/api/tenants/${tenantId!}`);
    expect(res.status).toBe(204);
  });
});
