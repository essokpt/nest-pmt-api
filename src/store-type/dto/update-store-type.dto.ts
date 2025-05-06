import { PartialType } from '@nestjs/swagger';
import { CreateStoreTypeDto } from './create-store-type.dto';

export class UpdateStoreTypeDto extends PartialType(CreateStoreTypeDto) {}
