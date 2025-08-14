import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, IsUrl, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  DATABASE_URL: string;

  @IsUrl()
  FRONTEND_URL: string;

  @IsString()
  CLERK_SECRET_KEY: string;

  @IsString()
  CLERK_PUBLISHABLE_KEY: string;

  @IsNumber()
  RATE_LIMIT_TTL: number;

  @IsNumber()
  RATE_LIMIT_MAX: number;

  @IsString()
  SMTP_HOST: string;

  @IsNumber()
  SMTP_PORT: number;

  @IsString()
  SMTP_USER: string;

  @IsString()
  SMTP_PASS: string;

  @IsString()
  IMAGEKIT_PUBLIC_KEY: string;

  @IsString()
  IMAGEKIT_PRIVATE_KEY: string;

  @IsUrl()
  IMAGEKIT_URL_ENDPOINT: string;

  @IsEnum(Environment)
  NODE_ENV: Environment;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
