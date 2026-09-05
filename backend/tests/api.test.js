import request from 'supertest';
import app from '../server.js';

describe('Appointy API', () => {
  it('GET / should return "API Working"', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('API Working');
  });

  it('GET /test-db should return database status', async () => {
    const res = await request(app).get('/test-db');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/Database is (connected|NOT connected)/);
  });

  it('POST /api/user/register should return error for missing fields', async () => {
    const res = await request(app).post('/api/user/register').send({});
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('Missing Details');
  });

  it('POST /api/user/register should return error for invalid email', async () => {
    const res = await request(app).post('/api/user/register').send({
      name: 'Test',
      email: 'invalid-email',
      password: 'password123'
    });
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('valid email');
  });

  it('POST /api/user/register should return error for weak password', async () => {
    const res = await request(app).post('/api/user/register').send({
      name: 'Test',
      email: 'test@example.com',
      password: '123'
    });
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('strong password');
  });
});
