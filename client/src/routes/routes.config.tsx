import { RouteObject } from "react-router-dom";
import { RequireAuth } from "../context/auth.context";
import Login from "./Login/Login";
import Root from "./Root/Root";
import Signup, { action as signupAction } from "./Signup/Signup";

const routesConfig:RouteObject[] = [
  {
    path: '/',
    element: <RequireAuth>
      <Root />
    </RequireAuth>
  },
    {
      path: '/login',
      element: <Login />
      // errorElement: <Login hasError={true} />
    },
    {
      path: '/signup',
      element: <Signup hasError={false} />,
      errorElement: <Signup hasError={true} />,
      action: signupAction
    }
  ]

  export default routesConfig;