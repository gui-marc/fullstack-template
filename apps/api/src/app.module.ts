import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './commom/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { z } from 'zod';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate(config) {
        const validateSchema = z.object({
          NODE_ENV: z
            .enum(['development', 'production', 'test'])
            .default('development'),
          PORT: z.number().default(3000),
          DATABASE_URL: z.string().url(),
        });
        validateSchema.parse(config);
        return config;
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'web', 'dist'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
