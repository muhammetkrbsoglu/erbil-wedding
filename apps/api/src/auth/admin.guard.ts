import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException('Bearer token is required');
      }

      const secretKey = this.configService.get<string>('CLERK_SECRET_KEY');
      if (!secretKey) {
        throw new Error('CLERK_SECRET_KEY is not defined');
      }

      const session = await clerkClient.sessions.verifySession(token, secretKey);
      const user = await clerkClient.users.getUser(session.userId);
      
      // Check if user has admin role in public metadata
      const isAdmin = user.publicMetadata?.role === 'admin';
      
      if (!isAdmin) {
        throw new UnauthorizedException('Admin access required');
      }

      // Attach user information to request
      request.user = {
        userId: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        role: user.publicMetadata?.role,
        firstName: user.firstName,
        lastName: user.lastName
      };

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid token or session');
    }
  }
}
