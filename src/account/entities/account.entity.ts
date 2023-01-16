import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../../src/common/containers/base_entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Item } from 'src/item/entities/item.entity';
import { Category } from 'src/category/entities/category.entity';

@Entity()
export class Account extends BaseEntity {
  @Column()
  public email: string;

  @Exclude()
  @Column()
  public password: string;

  @OneToMany(() => Item, (item) => item.account)
  public items: Item[];

  @OneToMany(() => Category, (category) => category.account)
  public categories: Category[];
}
