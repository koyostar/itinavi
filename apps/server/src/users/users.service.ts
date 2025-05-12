import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async create(userData: Partial<User>) {
    if (!userData.password) {
      throw new Error('Password is required');
    }

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const user = this.userRepo.create({
      ...userData,
      password: hashedPassword,
    });
    return this.userRepo.save(user);
  }

  async updateUser(id: string, updateData: Partial<User>) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new Error('User not found');
    }

    if (updateData.password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }

    const updated = Object.assign(user, updateData);
    return this.userRepo.save(updated);
  }
}
