import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'

import request from 'supertest'

import { AppModule } from '@/app.module'
import { UserCreateInput } from '@/models/user/entities/user.entity'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('App should be running (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/')

    expect(response.status).toBe(200)
    expect(response.text).toBe('Nest API works! 🎉!')
  })

  let userId = ''
  const user: UserCreateInput = {
    username: 'test',
    email: 'test@email.com',
    password: 'test'
  }

  it('Should create a new user (POST)', async () => {
    const response = await request(app.getHttpServer()).post('/user/create').send(user)

    expect(response.status).toBe(201)
    expect(response.body['username']).toBe(user.username)
    userId = response.body['id']
  })

  it('Should return all users (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/user/all')

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThanOrEqual(0)
  })

  it('Should delete a user (DELETE)', async () => {
    const response = await request(app.getHttpServer()).delete(`/user/${userId}`)

    expect(response.status).toBe(200)
  })
})
