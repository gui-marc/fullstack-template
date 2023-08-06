import { Injectable } from '@nestjs/common';
import ConfigService from './commom/config/config.service';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  private messages: string[] = [
    'Welcome to api!',
    'The api is running!',
    `The api is running on port ${this.configService.get('PORT')}!`,
  ];

  getRandomMessage(): string {
    const randomIndex = Math.floor(Math.random() * this.messages.length);
    return this.messages[randomIndex];
  }
}
