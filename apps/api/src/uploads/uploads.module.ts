import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { ImageKitModule } from '../imagekit/imagekit.module';

@Module({
  imports: [ImageKitModule],
  controllers: [UploadsController],
})
export class UploadsModule {}
