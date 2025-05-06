import { PartialType } from '@nestjs/swagger';
import { CreateVenderDto } from './create-vender.dto';

export class UpdateVenderDto extends PartialType(CreateVenderDto) {}
