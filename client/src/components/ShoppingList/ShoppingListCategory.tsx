import { isAccordionItemSelected } from 'react-bootstrap/esm/AccordionContext';
import { ListItem } from '../../types';
import ShoppingListItem from './ShoppingListItem';

type Props = {
  name: string;
  items: ListItem[];
};

export default function ShoppingListCategory({ items, name }: Props) {
  return (
    <div>
      <p>{name}</p>
      <ul>
        {items.map((item) => (
          <ShoppingListItem item={item} />
        ))}
      </ul>
    </div>
  );
}
