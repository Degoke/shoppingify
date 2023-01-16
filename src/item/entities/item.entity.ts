import { Account } from 'src/account/entities/account.entity';
import { Category } from 'src/category/entities/category.entity';
import { BaseEntity } from 'src/common/containers/base_entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Item extends BaseEntity {
  @Column()
  public name: string;

  @Column({ nullable: true })
  public note: string;

  @Column({ nullable: true })
  public image: string;

  @ManyToOne(() => Category, (category) => category.items)
  public category: Category;

  @ManyToOne(() => Account, (account) => account.items)
  public account: Account;
}
