import { Account } from 'src/account/entities/account.entity';
import { BaseEntity } from 'src/common/containers/base_entity';
import { ListItem } from 'src/listitem/entities/listitem.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Status } from '../list.type';

@Entity()
export class List extends BaseEntity {
  @OneToMany(() => ListItem, (listItem) => listItem.list)
  public items: ListItem[];

  @Column({ default: 'Shopping List' })
  public name: string;

  @Column({ default: true })
  public is_editing: boolean;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  public status: Status;

  @Column({ nullable: true })
  public completed_at: Date;

  @Column({ default: true })
  public is_current_list: boolean;

  @ManyToOne(() => Account, (account) => account.lists)
  public account: Account;
}
