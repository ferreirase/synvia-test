import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.use(cors());

  await app.listen(process.env.APP_PORT || 3000, () =>
    new Logger().log('SERVER IS RUNNING'),
  );
}
bootstrap();
