import { A } from '@solidjs/router';
import type { Component } from 'solid-js';

const Home: Component = () => {
    return (
        <>
            <A href='/login'>Login</A>
            <A href='/games'>Games</A>
            <A href='/communities'>Communities</A>
        </>
    );
};

export default Home;
