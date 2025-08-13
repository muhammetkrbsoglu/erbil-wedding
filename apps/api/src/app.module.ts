import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalonsModule } from './salons/salons.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, SalonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
