import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('random-message')
  getHello(): string {
    return this.appService.getRandomMessage();
  }
}
