import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SalonsService } from './salons.service';
import type { Salon } from '@acme/types';
import { CreateSalonDto } from './dto/create-salon.dto';

@Controller('salons')
export class SalonsController {
  constructor(private readonly salonsService: SalonsService) {}

  @Post()
  create(@Body() createSalonDto: CreateSalonDto) {
    return this.salonsService.create(createSalonDto);
  }

  @Get()
  findAll() {
    return this.salonsService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSalonDto: Partial<Salon>) {
    return this.salonsService.update(id, updateSalonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salonsService.remove(id);
  }
}
