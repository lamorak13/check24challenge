import { useParams } from '@solidjs/router';
import { Component } from 'solid-js';

const Game: Component<{}> = (props) => {
    const params = useParams();

    return <div>Single Game with id {params.id}</div>;
};

export default Game;
