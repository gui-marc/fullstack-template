import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import configSchema, { Config } from 'src/config';

@Injectable()
export default class ConfigService implements OnModuleInit {
  private config: Config;

  onModuleInit() {
    this.config = configSchema.parse(process.env);
    Logger.log(
      `Config Service Initialized with env: ${this.get('NODE_ENV')}`,
      'ConfigService',
    );
  }

  get(key: keyof Config): Config[typeof key] {
    return this.config[key];
  }
}
