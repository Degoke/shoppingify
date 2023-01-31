import { ListItem } from '../../types';

export default function ShoppingListItem(item: ListItem) {
  return (
    <div>
      <p>{item.item.name}</p>
      <p>{item.count}</p>
    </div>
  );
}
