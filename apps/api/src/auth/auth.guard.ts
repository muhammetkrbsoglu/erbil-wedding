import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { verifyToken } from '@clerk/clerk-sdk-node';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Authorization header is required');
    }

    const token = authorization.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('Bearer token is required');
    }

    try {
      // Verify the JWT token using Clerk's SDK
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
        issuer: 'https://clerk.dev', // Default Clerk issuer
      });

      // Attach the user payload to the request object for use in controllers
      // TODO: Implement user data attachment based on your needs
      request.user = {
        userId: payload.sub,
        // Add other user properties as needed
        ...payload,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
