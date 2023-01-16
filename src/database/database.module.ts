import { CacheModule, CacheStore, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-store';
import { Category } from 'src/category/entities/category.entity';
import { Item } from 'src/item/entities/item.entity';
import { List } from 'src/list/entities/list.entity';
import { ListItem } from 'src/listitem/entities/listitem.entity';
import { Account } from '../../src/account/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.postgres.host'),
        port: configService.get('database.postgres.port'),
        username: configService.get('database.postgres.username'),
        password: configService.get('database.postgres.password'),
        database: configService.get('database.postgres.database'),
        ssl: configService.get('env') === 'production' ? true : false,
        entities: [Account, Item, Category, List, ListItem],
        migrations: ['src/database/migrations/**/*.js'],
        cli: {
          migrationsDir: 'src/database/migrations',
        },
        migrationsRun: true,
        synchronize: true,
      }),
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: (await redisStore({
          socket: {
            host: configService.get('database.redis.host'),
            port: configService.get('database.redis.port'),
          },
        })) as unknown as CacheStore,

        ttl: configService.get('database.redis.ttl'),
        isGlobal: true,
        tls: {
          rejectUnauthorized: false,
        },
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('database.mongo.uri'),
      }),
    }),
  ],
})
export class DatabaseModule {}
