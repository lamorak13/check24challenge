import { Route, Router as BaseRouter } from '@solidjs/router';
import { Component, lazy } from 'solid-js';

const Home = lazy(() => import('./Home'));

const Layout = lazy(() => import('./Authentication/Layout'));
const Signin = lazy(() => import('./Authentication/Signin'));
const Signup = lazy(() => import('./Authentication/Signup'));

const Communities = lazy(() => import('./Communities/Index'));
const Community = lazy(() => import('./Communities/[id]'));

const Games = lazy(() => import('./Games/Index'));
const Game = lazy(() => import('./Games/[id]'));

const Router: Component = () => {
    return (
        <BaseRouter>
            <Route path='/' component={Home} />

            <Route path='/' component={Layout}>
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
        </BaseRouter>
    );
};

export default Router;
