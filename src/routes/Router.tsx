import { Route, Router as BaseRouter } from "@solidjs/router";
import { Component, lazy } from "solid-js";

const GeneralLayout = lazy(() => import("./Layout"));
const Home = lazy(() => import("./Home/Home"));

const AuthLayout = lazy(() => import("./Authentication/Layout"));
const Signin = lazy(() => import("./Authentication/Signin"));
const Signup = lazy(() => import("./Authentication/Signup"));

const Communities = lazy(() => import("./Communities/Index"));
const Community = lazy(() => import("./Communities/[id]"));

const Games = lazy(() => import("./Games/Index"));
const Game = lazy(() => import("./Games/[id]"));

const Router: Component = () => {
  return (
    <BaseRouter>
      <Route path='/' component={GeneralLayout}>
        <Route path='/' component={Home} />

        <Route path='/' component={AuthLayout}>
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
        </Route>

        <Route path='/communities'>
          <Route path='/' component={Communities} />
          <Route path='/:id' component={Community} />
        </Route>

        <Route path='/games'>
          <Route path='/' component={Games} />
          <Route path='/:id' component={Game} />
        </Route>
      </Route>
    </BaseRouter>
  );
};

export default Router;
