import { Account } from 'src/account/entities/account.entity';
import { BaseEntity } from 'src/common/containers/base_entity';
import { Item } from 'src/item/entities/item.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @Column()
  public name: string;

  @OneToMany(() => Item, (item) => item.category)
  public items: Item[];

  @ManyToOne(() => Account, (account) => account.categories)
  public account: Account;
}
