import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClerkAuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

@Module({
  imports: [ConfigModule],
  providers: [ClerkAuthGuard, AdminGuard],
  exports: [ClerkAuthGuard, AdminGuard],
})
export class AuthModule {}
