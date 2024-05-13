import { Component, createSignal } from 'solid-js';
import HorizontalLine from '../../components/shared/HorizontalLine';
import Input from '../../components/form/Input';
import Button from '../../components/form/Button';
import { A } from '@solidjs/router';

const Signup: Component<{}> = (props) => {
    const [name, setName] = createSignal('');

    return (
        <>
            <h1 class='text-center'>Create your Account</h1>
            <HorizontalLine />
            <Input placeholder={'Your username'} value={name()} onInput={setName} />
            <Button text='Create account' />
            <p class='text-lg mt-5'>
                Already have an account? <A href='/signin'>Sign in!</A>
            </p>
        </>
    );
};

export default Signup;
