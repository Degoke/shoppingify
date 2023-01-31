import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import Root from './routes/Root/Root';
import Login from './routes/Login/Login';
import { AuthProvider, RequireAuth } from './context/auth.context';
import Signup, { action as signupAction } from './routes/Signup/Signup';
import routesConfig from './routes/routes.config';
import createRouteConfig from './routes/routes.config';

export const queryClient = new QueryClient();

const router = createBrowserRouter(createRouteConfig(queryClient));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
);
