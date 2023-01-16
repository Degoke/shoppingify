import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../../src/common/containers/base_entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Item } from 'src/item/entities/item.entity';
import { Category } from 'src/category/entities/category.entity';
import { List } from 'src/list/entities/list.entity';
import { ListItem } from 'src/listitem/entities/listitem.entity';

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

  @OneToMany(() => List, (list) => list.account)
  public lists: List[];

  @OneToMany(() => ListItem, (listitem) => listitem.account)
  public list_items: List[];
}
