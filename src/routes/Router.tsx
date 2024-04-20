import { Route, Router as BaseRouter } from '@solidjs/router';
import { Component, lazy } from 'solid-js';

const Home = lazy(() => import('./Home'));
const Login = lazy(() => import('./Login'));

const Communities = lazy(() => import('./Communities/Index'));
const Community = lazy(() => import('./Communities/[id]'));

const Games = lazy(() => import('./Games/Index'));
const Game = lazy(() => import('./Games/[id]'));

const Router: Component = () => {
    return (
        <BaseRouter>
            <Route path='/login' component={Login} />

            <Route path='/communities'>
                <Route path='/' component={Communities} />
                <Route path='/:id' component={Community} />
            </Route>

            <Route path='/games'>
                <Route path='/' component={Games} />
                <Route path='/:id' component={Game} />
            </Route>

            <Route path='/' component={Home} />
        </BaseRouter>
    );
};

export default Router;
