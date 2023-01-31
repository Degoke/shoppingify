import { getEnabledCategories } from 'trace_events';
import ShoppingListCategory from './ShoppingListCategory';

type Props = {
  categories: any[];
};

export default function ShoppingList({ categories }: Props) {
  return (
    <section>
      <div>
        <p>Didnt find what you need?</p>
        <button type="button">Add item</button>
      </div>
      <div>
        <p>Shopping List</p>
        <button type="button">E</button>
      </div>
      {categories.map((category) => (
        <ShoppingListCategory name={category.name} items={category.items} />
      ))}
    </section>
  );
}
