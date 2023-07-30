import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { z } from 'zod';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
