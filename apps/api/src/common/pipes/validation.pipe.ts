import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class GlobalValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return {
          statusCode: 400,
          error: 'Validation Error',
          message: errors.map(error => ({
            field: error.property,
            errors: Object.values(error.constraints || {})
          }))
        };
      }
    });
  }
}
