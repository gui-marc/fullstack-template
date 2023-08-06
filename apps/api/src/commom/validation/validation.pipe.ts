import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);

    if (result.success === false) {
      throw new BadRequestException({
        type: 'validation',
        errors: result.error,
      });
    }

    return result.data;
  }
}
