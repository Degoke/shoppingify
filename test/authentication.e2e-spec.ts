import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { mockLOginDto } from '../src/authentication/mock';
import { Account } from '../src/account/entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from '../src/authentication/authentication.module';
import { AccountModule } from '../src/account/account.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: 'sqlite',
      database: 'memory',
      dropSchema: true,
      entities: [Account],
      synchronize: true,
      logging: false
      }), AuthenticationModule, AccountModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return error on login with no user created', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/authentication/login')
      .send(mockLOginDto)
      .expect(401)

      expect(response.body.access_token).not.toBeDefined()
  });

  it("should return erroe on signup when no email present", async() => {
    const response = await request(app.getHttpServer())
      .post('/v1/account/create')
      .send({...mockLOginDto, email: null})
      .expect(401)

      expect(response.body.email).not.toBeDefined()
  })

  it('should create an account with the proper email and password', async() => {
    const response = await request(app.getHttpServer())
      .post('/v1/account/create')
      .send(mockLOginDto)
      .expect(201)

      expect(response.body.email).toEqual(mockLOginDto.email)
  })

  it('should return an error on create account when email exists', async () => {
    const response = await request(app.getHttpServer())
    .post('/v1/account/create')
    .send(mockLOginDto)
    .expect(401)

    expect(response.body.email).not.toBeDefined()
  })

  it('should login user with correct email and password', async () => {
    const response = await request(app.getHttpServer)
    .post('/v1/authentication/login')
      .send(mockLOginDto)
      .expect(200)

    expect(response.body.access_token).toBeDefined()
  })
});
