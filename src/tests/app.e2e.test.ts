// tests/app.e2e.test.ts
import { api } from './setup'; // importa o request(app) já configurado

let masterToken = '';
let freeToken = '';
let segmentId = '';
let tenantId = '';

describe('Fluxo completo do sistema', () => {
  it('1. Deve criar um usuário Master (dono do app)', async () => {
    const res = await api.post('/api/auth/register').send({
      email: 'master@app.com',
      password: '12345678',
      role: 'master',
    });

    expect(res.statusCode).toBe(201);
  });

  it('2. Deve logar com o usuário Master', async () => {
    const res = await api.post('/api/auth/login').send({
      email: 'master@app.com',
      password: '12345678',
      role: 'master',
    });

    expect(res.statusCode).toBe(200);
    masterToken = res.body.token;
    expect(masterToken).toBeDefined();
  });

  // it('3. Deve registrar um usuário Free (via site)', async () => {
  //   const res = await api.post('/api/auth/register').send({
  //     email: 'free@site.com',
  //     password: '12345678',
  //     role: 'free',
  //   });

  //   expect(res.statusCode).toBe(201);
  // });

  // it('4. Deve logar com o usuário Free', async () => {
  //   const res = await api.post('/api/auth/login').send({
  //     email: 'free@site.com',
  //     password: '12345678',
  //   });

  //   expect(res.statusCode).toBe(200);
  //   freeToken = res.body.token;
  //   expect(freeToken).toBeDefined();
  // });

  it('5. Deve criar um seguimento "academia" (somente Master)', async () => {
    const res = await api
      .post('/api/segments')
      .set('Authorization', `Bearer ${masterToken}`)
      .send({ name: 'academia' });

      console.log(masterToken)

    expect(res.statusCode).toBe(201);
    segmentId = res.body._id;
    expect(segmentId).toBeDefined();
  });

  // it('6. Não deve permitir que usuário Free crie segmento', async () => {
  //   const res = await api
  //     .post('/api/segments')
  //     .set('Authorization', `Bearer ${freeToken}`)
  //     .send({ name: 'mercadinho' });

  //   expect(res.statusCode).toBe(403);
  // });

  // it('7. Master deve ver os módulos padrões ao criar um tenant', async () => {
  //   const res = await api
  //     .post('/api/tenants')
  //     .set('Authorization', `Bearer ${masterToken}`)
  //     .send({
  //       name: 'SmartFit',
  //       segmentId: segmentId,
  //     });

  //   expect(res.statusCode).toBe(201);
  //   tenantId = res.body._id;

  //   const modules = res.body.modulesEnabled;
  //   expect(modules.clientes).toBe(true);
  //   expect(modules.financeiro).toBe(true);
  //   expect(modules.rastreabilidade).toBe(true);
  //   expect(modules.estoque).toBe(false); // default false
  // });

  // it('8. Não deve permitir que Free crie um tenant', async () => {
  //   const res = await api
  //     .post('/api/tenants')
  //     .set('Authorization', `Bearer ${freeToken}`)
  //     .send({
  //       name: 'FreeShop',
  //       segmentId: segmentId,
  //     });

  //   expect(res.statusCode).toBe(403);
  // });
});
