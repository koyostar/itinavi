import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accommodation } from './accommodation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccommodationService {
  constructor(
    @InjectRepository(Accommodation)
    private accommodationRepo: Repository<Accommodation>,
  ) {}

  create(data: Partial<Accommodation>) {
    const newAccommodation = this.accommodationRepo.create(data);
    return this.accommodationRepo.save(newAccommodation);
  }

  findAll() {
    return this.accommodationRepo.find();
  }

  findOne(id: number) {
    return this.accommodationRepo.findOneBy({ id });
  }

  async update(id: number, data: Partial<Accommodation>) {
    await this.accommodationRepo.update(id, data);
    return this.accommodationRepo.findOneBy({ id });
  }

  delete(id: number) {
    return this.accommodationRepo.delete(id);
  }
}
