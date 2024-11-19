import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'

import request from 'supertest'

import { AppModule } from '@/app.module'
import { UserCreateInput, UserUpdateInput } from '@/models/user/entities/user.entity'

import { beforeEach, describe, expect, it } from 'vitest'

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

  let accessToken = ''

  const admin: UserCreateInput = {
    username: 'admin',
    password: 'admin'
  }

  it('Should sign in an admin user (POST)', async () => {
    const response = await request(app.getHttpServer()).post('/auth/sign-in').send(admin)

    const { user: _user, accessToken: _accessToken } = response.body

    expect(response.status).toBe(201)
    expect(_user['username']).toBe(admin.username)
    accessToken = _accessToken
  })

  let userId = ''
  const user: UserCreateInput = {
    username: 'test',
    password: 'test'
  }

  it('Should sign up a new user (POST)', async () => {
    const response = await request(app.getHttpServer()).post('/auth/sign-up').send(user).set('authorization', `Bearer ${accessToken}`)

    const { id, username } = response.body

    expect(response.status).toBe(201)
    expect(username).toBe(user.username)
    userId = id
  })

  it('Should create a new user (PUT)', async () => {
    const updatedUser: UserUpdateInput = {
      name: 'Test User'
    }

    const response = await request(app.getHttpServer()).put(`/user/${userId}`).send(updatedUser).set('authorization', `Bearer ${accessToken}`)

    const { username } = response.body

    expect(response.status).toBe(200)
    expect(username).toBe(user.username)
  })

  it('Should return all users (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/user/all').set('authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThanOrEqual(0)
  })

  it('Should delete a user (DELETE)', async () => {
    const response = await request(app.getHttpServer()).delete(`/user/${userId}`).set('authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
  })
})
