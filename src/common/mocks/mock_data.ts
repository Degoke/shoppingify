import { BaseEntity } from '../containers/base_entity';
import * as bcrypt from 'bcrypt'
import { Account } from 'src/account/entities/account.entity';
import { Category } from 'src/category/entities/category.entity';
import { Item } from 'src/item/entities/item.entity';
let mockCategory: Category | null = null;
let mockItem: Item | null = null;

export const mockAccount: Account = {
  id: '1',
  email: 'testuser@gmail.com',
  password: bcrypt.hashSync('Test_password1', 10),
  created_at: new Date(Date.now()),
  updated_at: new Date(Date.now()),
  items: [
    mockItem!,
  ],
  categories: [
    mockCategory!,
  ]
};

mockItem = {
    id: '1',
  created_at: new Date(Date.now()),
  updated_at: new Date(Date.now()),
  category: mockCategory!,
  account: mockAccount,
  name: "pepper",
  image: '',
  note: 'A pepper',
}

mockCategory = {
    id: '1',
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now()),
    name: "vegetables",
    items: [
        mockItem,
    ],
    account:mockAccount
}

// export const mockBase: BaseEntity = {
//   id: '1',
//   created_at: new Date(Date.now()),
//   updated_at: new Date(Date.now()),
// };
