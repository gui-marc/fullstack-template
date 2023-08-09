import { BadRequestException } from '@nestjs/common';

export default class UserAlreadyExistsException extends BadRequestException {
  constructor() {
    super('User already exists');
  }
}
