import { Component } from 'solid-js';

const Input: Component<{ placeholder: string; value: string; onInput: (s: string) => void }> = (props) => {
    const placeholder = () => props.placeholder;
    const value = () => props.value;

    return (
        <input
            value={value()}
            placeholder={placeholder()}
            type='text'
            onInput={(e) => props.onInput(e.target.value)}
            class='bg-white/10 border-beige/10 border-2 rounded-base py-3 px-5 placeholder-white'
        />
    );
};

export default Input;
