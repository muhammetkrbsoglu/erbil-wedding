import { Injectable } from '@nestjs/common';
import { placeholderSalons } from '../../../web/lib/data';

@Injectable()
export class SalonsService {
  findAll() {
    return placeholderSalons;
  }
}
