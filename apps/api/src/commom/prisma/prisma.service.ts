import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    Logger.log('Connected to database', 'PrismaService');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    Logger.log('Disconnected from database', 'PrismaService');
  }
}
