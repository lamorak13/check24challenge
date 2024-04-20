import { Component } from 'solid-js';
import getFlagEmoji from '../../utils/types/getFlagEmoji';

const Nation: Component<{ nation: string }> = (props) => {
    return (
        <div class='flex flex-col items-center'>
            <span class='text-5xl'>{getFlagEmoji(props.nation)}</span>
            <span class='text-xl font-semibold uppercase tracking-wider'>{props.nation}</span>
        </div>
    );
};

export default Nation;
