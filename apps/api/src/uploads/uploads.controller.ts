import { Controller, Get, UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from '../auth/auth.guard';
import { ImageKitService } from '../imagekit/imagekit.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly imagekitService: ImageKitService) {}

  @Get('auth')
  @UseGuards(ClerkAuthGuard)
  getAuthenticationParameters() {
    return this.imagekitService.getAuthenticationParameters();
  }
}
