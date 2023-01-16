import { Account } from 'src/account/entities/account.entity';
import { BaseEntity } from 'src/common/containers/base_entity';
import { Item } from 'src/item/entities/item.entity';
import { List } from 'src/list/entities/list.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class ListItem extends BaseEntity {
  @ManyToOne(() => Item, (item) => item.list_items)
  public item: Item;

  @Column()
  public count: number;

  @Column({ default: false })
  public is_completed: boolean;

  @Column({ nullable: true })
  public completed_at: Date;

  @ManyToOne(() => List, (list) => list.items, {
    onDelete: 'CASCADE',
  })
  public list: List;

  @ManyToOne(() => Account, (account) => account.list_items, {
    onDelete: 'CASCADE',
  })
  public account: Account;
}
