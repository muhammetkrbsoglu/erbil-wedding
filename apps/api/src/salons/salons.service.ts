import { Injectable } from '@nestjs/common';
import type { Salon } from '@acme/types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SalonsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.salon.findMany();
  }
}
