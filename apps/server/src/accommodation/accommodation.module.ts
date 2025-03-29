import { Module } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { AccommodationController } from './accommodation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accommodation } from './accommodation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accommodation])],
  providers: [AccommodationService],
  controllers: [AccommodationController],
})
export class AccommodationModule {}
