import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EntityManager, Repository } from 'typeorm';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly entityManager: EntityManager,
  ) {}

  // register
  async createRegister(createRegisterDto: CreateRegisterDto) {
    if (!/^[a-z0-9\s]+$/.test(createRegisterDto.password)) {
      throw new BadRequestException('sandi hanya boleh huruf dan angka');
    }
    if (!/^[a-z@.\s]+$/.test(createRegisterDto.email)) {
      throw new BadRequestException('email hanya boleh berisi huruf');
    }

    const hashedPassword = await bcrypt.hash(createRegisterDto.password, 10);
    const newUser = this.userRepository.create({
      ...createRegisterDto,
      password: hashedPassword,
    });
    await this.entityManager.save(newUser);
  }

  // menampilkan semua data
  async findAll(): Promise<Users[]> {
    return this.userRepository.find({
      relations: ['postings', 'postings.bookmark'],
    });
  }
}
