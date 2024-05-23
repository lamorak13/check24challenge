import { Route, Router as BaseRouter } from "@solidjs/router";
import { Component, lazy } from "solid-js";
import { UserNameProvider } from "./UserNameContext";

const GeneralLayout = lazy(() => import("./Layout"));
const Home = lazy(() => import("./Home/Home"));

const AuthLayout = lazy(() => import("./Authentication/Layout"));
const Signin = lazy(() => import("./Authentication/Signin"));
const Signup = lazy(() => import("./Authentication/Signup"));

const Community = lazy(() => import("./Communities/[id]"));

const Games = lazy(() => import("./Games/Index"));

const Router: Component = () => {
  return (
    <UserNameProvider>
      <BaseRouter>
        <Route path='/' component={GeneralLayout}>
          <Route path='/' component={Home} />

          <Route path='/' component={AuthLayout}>
            <Route path='/signin' component={Signin} />
            <Route path='/signup' component={Signup} />
          </Route>

          <Route path='/communities/:id' component={Community} />

          <Route path='/games' component={Games} />
        </Route>
      </BaseRouter>
    </UserNameProvider>
  );
};

export default Router;
