import { Component } from 'solid-js';

const Button: Component<{ text: string }> = (props) => {
    const text = () => props.text;

    return (
        <button class='bg-light-blue border-2 rounded-base border-beige/20 px-5 py-2 text-xl font-semibold'>{text()}</button>
    );
};

export default Button;
