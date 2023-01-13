import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../../src/common/containers/base_entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Account extends BaseEntity {
  @Column()
  public email: string;

  @Exclude()
  @Column()
  public password: string;
}
