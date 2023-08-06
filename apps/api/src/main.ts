import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  // Security

  app.use(
    bodyParser.json({
      limit: '5mb',
    }),
  );

  app.use(
    bodyParser.urlencoded({
      limit: '5mb',
      extended: true,
    }),
  );

  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP, please try again later',
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
