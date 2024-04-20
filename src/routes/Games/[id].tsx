import { Component, createSignal } from 'solid-js';
import { RiArrowsArrowDropRightLine, RiArrowsArrowDropLeftLine } from 'solid-icons/ri';
import Card from '../../components/games/Card';
import { GameStatus } from '../../utils/types/GameStatus';

const Game: Component<{}> = (props) => {
    const [game, setGame] = createSignal(
        {
            home: {
                score: 3,
                team: 'GER',
            },
            away: {
                score: 2,
                team: 'ESP',
            },
            status: GameStatus.UPCOMING,
            arena: 'BVB Stadion Dortmund',
        },
        { equals: false }
    );

    return (
        <section class='p-5 flex gap-5 items-center'>
            <button class='border-light-blue border-2 rounded-full hover:bg-light-blue/10'>
                <RiArrowsArrowDropLeftLine class='text-[50px] text-light-blue' />
            </button>

            <Card game={game()} />
            <button class='border-light-blue border-2 rounded-full hover:bg-light-blue/10'>
                <RiArrowsArrowDropRightLine class='text-[50px] text-light-blue ' />
            </button>
        </section>
    );
};

export default Game;
