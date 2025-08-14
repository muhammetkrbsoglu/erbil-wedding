import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalonsModule } from './salons/salons.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ImageKitModule } from './imagekit/imagekit.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [PrismaModule, AuthModule, SalonsModule, AdminModule, ImageKitModule, UploadsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
