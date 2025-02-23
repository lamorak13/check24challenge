import { Route, Router as BaseRouter } from "@solidjs/router";
import { Component, lazy } from "solid-js";
import { UserProvider } from "./UserNameContext";

const GeneralLayout = lazy(() => import("./Layout"));
const Home = lazy(() => import("./Home/Home"));
const AuthLayout = lazy(() => import("./Authentication/Layout"));
const Signin = lazy(() => import("./Authentication/Signin"));
const Signup = lazy(() => import("./Authentication/Signup"));
const Community = lazy(() => import("./Communities/[id]"));
const Games = lazy(() => import("./Games/Index"));

const Router: Component = () => {
  return (
    <UserProvider>
      <BaseRouter>
        <Route path='/' component={GeneralLayout}>
          <Route path='/' component={Home} />

          <Route path='/communities/:id' component={Community} />

          <Route path='/games' component={Games} />
        </Route>

        <Route path='/' component={AuthLayout}>
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
        </Route>
      </BaseRouter>
    </UserProvider>
  );
};

export default Router;
