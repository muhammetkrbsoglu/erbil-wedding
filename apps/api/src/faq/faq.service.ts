import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFaqDto } from './dto/create-faq.dto';

@Injectable()
export class FaqService {
  constructor(private prisma: PrismaService) {}

  async create(createFaqDto: CreateFaqDto) {
    return this.prisma.fAQ.create({
      data: createFaqDto,
    });
  }

  async findAll(category?: string) {
    const where = category ? { category } : {};
    return this.prisma.fAQ.findMany({
      where: {
        ...where,
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }

  async findAllAdmin() {
    return this.prisma.fAQ.findMany({
      orderBy: [
        { category: 'asc' },
        { order: 'asc' },
      ],
    });
  }

  async findOne(id: string) {
    return this.prisma.fAQ.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateData: Partial<CreateFaqDto>) {
    return this.prisma.fAQ.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string) {
    return this.prisma.fAQ.delete({
      where: { id },
    });
  }

  async reorder(items: { id: string; order: number }[]) {
    const updates = items.map(item =>
      this.prisma.fAQ.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    );
    return this.prisma.$transaction(updates);
  }
}
