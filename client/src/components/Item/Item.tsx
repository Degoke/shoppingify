import { Item } from '../../types';

export default function Item({ name }: Item) {
  return (
    <div>
      <p>{name}</p>
    </div>
  );
}
