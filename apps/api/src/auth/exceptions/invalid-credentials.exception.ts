import { BadRequestException } from '@nestjs/common';

export default class InvalidCredentialsException extends BadRequestException {
  constructor() {
    super('Invalid credentials');
  }
}
