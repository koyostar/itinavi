import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { Accommodation } from './accommodation.entity';

@Controller('accommodation')
export class AccommodationController {
  constructor(private readonly accommodationService: AccommodationService) {}

  @Post()
  create(@Body() data: Partial<Accommodation>) {
    return this.accommodationService.create(data);
  }

  @Get()
  findAll() {
    return this.accommodationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accommodationService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Accommodation>) {
    return this.accommodationService.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.accommodationService.delete(+id);
  }
}
