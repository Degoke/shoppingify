import { QueryClient } from '@tanstack/react-query';
import { RouteObject } from 'react-router-dom';
import { RequireAuth } from '../context/auth.context';
import Login from './Login/Login';
import Root, { loader as rootLoader } from './Root/Root';
import Signup, { action as signupAction } from './Signup/Signup';

export default function createRouteConfig(
  queryClient: QueryClient,
): RouteObject[] {
  return [
    {
      path: '/',
      element: (
        <RequireAuth>
          <Root />
        </RequireAuth>
      ),
      loader: rootLoader(queryClient),
    },
    {
      path: '/login',
      element: <Login />,
      // errorElement: <Login hasError={true} />
    },
    {
      path: '/signup',
      element: <Signup hasError={false} />,
      errorElement: <Signup hasError={true} />,
      action: signupAction,
    },
  ];
}
