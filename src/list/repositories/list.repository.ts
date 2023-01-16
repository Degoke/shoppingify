import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { List } from '../entities/list.entity';

@Injectable()
export class ListRepository extends Repository<List> {
  constructor(private dataSource: DataSource) {
    super(List, dataSource.createEntityManager());
  }
}
