import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ListItem } from '../entities/listitem.entity';

@Injectable()
export class ListItemRepository extends Repository<ListItem> {
  constructor(private dataSource: DataSource) {
    super(ListItem, dataSource.createEntityManager());
  }
}
