import { Injectable } from '@nestjs/common';
import ImageKit from 'imagekit';

@Injectable()
export class ImageKitService {
  private imagekit: ImageKit;

  constructor() {
    this.imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY || 'YOUR_PRIVATE_KEY',
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || 'YOUR_URL_ENDPOINT',
    });
  }

  getAuthenticationParameters() {
    return this.imagekit.getAuthenticationParameters();
  }
}
