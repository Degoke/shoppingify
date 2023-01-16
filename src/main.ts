import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { exec } from 'child_process';
import helmet from 'helmet';
// import * as compression from 'compression';
import { AppModule } from './app.module';
import Logger from './logs/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.enableCors();

  app.use(helmet());

  // app.useLogger(app.get(Logger));

  // app.use(compression());

  // await runMigrations()
  await app.listen(process.env.PORT!);
}
bootstrap();
