import { plainToInstance, Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  PORT: number;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  FRONTEND_URL: string;

  @IsString()
  CLERK_SECRET_KEY: string;

  @IsString()
  CLERK_PUBLISHABLE_KEY: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  RATE_LIMIT_TTL: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  RATE_LIMIT_MAX: number;

  @IsString()
  IMAGEKIT_PUBLIC_KEY: string;

  @IsString()
  IMAGEKIT_PRIVATE_KEY: string;

  @IsString()
  IMAGEKIT_URL_ENDPOINT: string;

  @IsEnum(Environment)
  NODE_ENV: Environment;
}

export function validate(config: Record<string, unknown>) {
  console.log('Raw config:', config);
  try {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
      enableImplicitConversion: true,
    });
    console.log('Transformed config:', validatedConfig);
    
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      console.log('Validation errors:', errors);
      const errorMessages = errors.map((error) => {
        const constraints = error.constraints
          ? Object.values(error.constraints).join(', ')
          : 'Unknown error';
        return `${error.property}: ${constraints}`;
      });
      
      throw new Error(
        `Environment validation failed:\n${errorMessages.join('\n')}`
      );
    }

    return validatedConfig;
  } catch (error) {
    console.error('Error during validation:', error);
    throw error;
  }
}