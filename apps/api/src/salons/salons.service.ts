import { Injectable } from '@nestjs/common';
import type { Salon } from '@acme/types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SalonsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.salon.findMany();
  }

  async update(id: string, updateSalonDto: Partial<Salon>) {
    return this.prisma.salon.update({
      where: { id },
      data: updateSalonDto,
    });
  }

  async remove(id: string) {
    return this.prisma.salon.delete({
      where: { id },
    });
  }
}
