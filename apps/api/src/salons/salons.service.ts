import { Injectable } from '@nestjs/common';
import type { Salon } from '@acme/types';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalonDto } from './dto/create-salon.dto';

@Injectable()
export class SalonsService {
  constructor(private prisma: PrismaService) {}

  async create(createSalonDto: CreateSalonDto) {
    return this.prisma.salon.create({
      data: {
        ...createSalonDto,
        slug: this.createSlug(createSalonDto.name),
      },
    });
  }

  private createSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

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
