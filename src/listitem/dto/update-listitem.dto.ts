import { PartialType } from '@nestjs/swagger';
import { CreateListitemDto } from './create-listitem.dto';

export class UpdateListitemDto extends PartialType(CreateListitemDto) {}
