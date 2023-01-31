import { QueryClient, useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import { getItems } from '../../api/item';
import ShoppingList from '../../components/ShoppingList/ShoppingList';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useAuth } from '../../context/auth.context';

const getAllItemsQuery = () => ({
  queryKey: ['items'],
  queryFn: getItems,
});
export const loader = (queryClient: QueryClient) => async () => {
  const query = getAllItemsQuery();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export default function Root() {
  const auth = useAuth();

  const { data: items } = useQuery(getAllItemsQuery());
  console.log(auth.user);
  console.log(items);
  return (
    <div>
      <Sidebar />
      <main>
        <h1>
          <span>Shoppingify</span> allows you take your shopping list wherever
          you go
        </h1>
      </main>
      <ShoppingList categories={[]} />
    </div>
  );
}
