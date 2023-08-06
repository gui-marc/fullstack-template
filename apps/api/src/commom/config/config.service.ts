import { Injectable, Logger } from '@nestjs/common';
import configSchema, { Config } from 'src/config';

@Injectable()
export default class ConfigService {
  private readonly config: Config;

  constructor() {
    this.config = configSchema.parse(process.env);
  }

  onModuleInit() {
    Logger.log(
      `Config Service Initialized with env: ${this.get('NODE_ENV')}`,
      'ConfigService',
    );
  }

  get(key: keyof Config): Config[typeof key] {
    return this.config[key];
  }
}
