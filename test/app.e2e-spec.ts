import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Challengue works! 🎉!');
  });

  it('/api/people/create (POST)', async () => {
    const name = 'test';

    const response = await request(app.getHttpServer())
      .post('/people/create')
      .send({ name });

    expect(response.status).toBe(201);
    expect(response.body['name']).toBe(name);
  });

  it('/api/people (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/people');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });
});
