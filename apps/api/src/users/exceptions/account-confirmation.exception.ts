import { HttpException, HttpStatus } from '@nestjs/common';

export default class AccountConfirmationException extends HttpException {
  constructor() {
    super('Account confirmation is required', HttpStatus.FORBIDDEN);
  }
}
