import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { AdminGuard } from '../auth/admin.guard';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  async findAll(@Query('category') category?: string) {
    return this.faqService.findAll(category);
  }

  @Get('admin')
  @UseGuards(AdminGuard)
  async findAllAdmin() {
    return this.faqService.findAllAdmin();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.faqService.findOne(id);
  }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateFaqDto>,
  ) {
    return this.faqService.update(id, updateData);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async delete(@Param('id') id: string) {
    return this.faqService.delete(id);
  }

  @Post('reorder')
  @UseGuards(AdminGuard)
  async reorder(@Body() items: { id: string; order: number }[]) {
    return this.faqService.reorder(items);
  }
}
