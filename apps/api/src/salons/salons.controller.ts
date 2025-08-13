import { Controller, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { SalonsService } from './salons.service';
import type { Salon } from '@acme/types';

@Controller('salons')
export class SalonsController {
  constructor(private readonly salonsService: SalonsService) {}

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
