import { QueryClient } from '@tanstack/react-query';
import {
  Form,
  NavLink,
  useLocation,
  useNavigate,
  useRouteError,
} from 'react-router-dom';
import { login, LoginDto } from '../../api/auth';
import { Alert } from 'react-bootstrap';
import { useAuth } from '../../context/auth.context';
import React from 'react';

type Props = {
  hasError: boolean;
};

// export const action = (queryClient: any) => async ({ request, params }: any) => {
//     const formData = await request.formData()
//     const email = formData.get('email')
//     const password = formData.get('password')
//     await login({email, password})

//     return null
// }

export default function Login() {
  const error = useRouteError() as any;

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || '/';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    auth.signin({ email, password }, () => navigate(from, { replace: true }));
  };
  return (
    <div className="container max-w-screen-sm mx-auto border border-black border-solid rounded-3xl px-8 my-[15%]">
      <form onSubmit={handleSubmit} className="mx-auto w-[80%] p-4">
        <h1 className="text-lg font-semibold mb-2">Login</h1>
        <label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="material-icons">email</span>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-4 block pl-10"
            />
          </div>
        </label>
        <label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="material-icons">lock</span>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-4 block pl-10"
            />
          </div>
        </label>
        <button
          className="bg-blue-300 rounded-lg p-3 w-full mb-8"
          type="submit"
        >
          Login
        </button>
        <p className="text-center">Dont have an account yet? Register</p>
      </form>
    </div>
  );
}
