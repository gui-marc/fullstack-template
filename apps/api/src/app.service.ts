import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private messages: string[] = [
    'Welcome to api!',
    'The api is running!',
    'The api is running on port 3000!',
  ];

  getRandomMessage(): string {
    const randomIndex = Math.floor(Math.random() * this.messages.length);
    return this.messages[randomIndex];
  }
}
