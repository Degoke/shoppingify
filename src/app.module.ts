import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { LogsModule } from './logs/logs.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AccountModule } from './account/account.module';
import configuration from './config/configuration';
import { JwtAuthGaurd } from './common/gaurds/jwt_auth.gaurd';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerBehindProxyGaurd } from './common/gaurds/throttler_behind_proxy.gaurd';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ItemModule } from './item/item.module';
import { ListModule } from './list/list.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", 'public')
    }),
    DatabaseModule,
    LogsModule,
    AuthenticationModule,
    AccountModule,
    ItemModule,
    ListModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGaurd }, { provide: APP_GUARD, useClass: ThrottlerBehindProxyGaurd }],
})
export class AppModule {}
