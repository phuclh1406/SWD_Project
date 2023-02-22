const request = require('supertest');
const app = require('../app');

describe('GET /api/v1/students', () => {
  it('responds with a list of users', async () => {
    const response = await request(app).get('/api/v1/students');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});