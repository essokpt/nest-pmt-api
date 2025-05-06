import { Injectable } from '@nestjs/common';
import { CreateVenderDto } from './dto/create-vender.dto';
import { UpdateVenderDto } from './dto/update-vender.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class VenderService {
  constructor(private prisma: PrismaService){}

  create(createDto: CreateVenderDto) {
    return this.prisma.vender.create({
      data: createDto
    });
  }

  findAll() {
    return this.prisma.vender.findMany();
  }

  findOne(id: number) {
    return this.prisma.vender.findUnique({
      where: { id : id}
    });
  }

  update(id: number, updateDto: UpdateVenderDto) {
    return this.prisma.vender.update({
      where: { id : id },
      data : updateDto
    });
  }

  remove(id: number) {
    return this.prisma.vender.delete({
      where: { id : id }
    });
  }
}
