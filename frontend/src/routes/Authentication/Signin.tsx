import { A } from '@solidjs/router';
import { Component, createSignal } from 'solid-js';
import HorizontalLine from '../../components/shared/HorizontalLine';
import Button from '../../components/form/Button';
import Input from '../../components/form/Input';

const Signin: Component<{}> = () => {
    const [name, setName] = createSignal('');

    return (
        <>
            <h1 class='text-center'>Sign in to your Account</h1>
            <HorizontalLine />
            <Input placeholder={'Your name ...'} value={name()} onInput={setName} />
            <Button text='Sign in' />
            <p class='text-lg mt-5'>
                Dont have an account yet? <A href='/signup'>Sign up!</A>
            </p>
        </>
    );
};

export default Signin;
