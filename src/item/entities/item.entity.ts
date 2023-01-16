import { Account } from 'src/account/entities/account.entity';
import { Category } from 'src/category/entities/category.entity';
import { BaseEntity } from 'src/common/containers/base_entity';
import { ListItem } from 'src/listitem/entities/listitem.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Item extends BaseEntity {
  @Column()
  public name: string;

  @Column({ nullable: true })
  public note: string;

  @Column({ nullable: true })
  public image: string;

  @ManyToOne(() => Category, (category) => category.items, {
    onDelete: 'CASCADE',
  })
  public category: Category;

  @ManyToOne(() => Account, (account) => account.items, {
    onDelete: 'CASCADE',
  })
  public account: Account;

  @OneToMany(() => ListItem, (listItem) => listItem.item, {
    onDelete: 'CASCADE',
  })
  public list_items: ListItem[];
}
