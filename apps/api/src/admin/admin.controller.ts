import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ClerkAuthGuard } from '../auth/auth.guard';

@Controller('admin')
@UseGuards(ClerkAuthGuard)
export class AdminController {
  @Get()
  getAdminData(@Request() req) {
    return {
      message: 'This is protected admin data',
      user: req.user,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('dashboard')
  getDashboard(@Request() req) {
    return {
      message: 'Admin Dashboard Data',
      userId: req.user.userId,
      dashboardStats: {
        totalSalons: 3,
        totalBookings: 15,
        pendingRequests: 5,
      },
    };
  }
}
