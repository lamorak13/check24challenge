import { Component } from 'solid-js';
import { Game } from '../../utils/types/Game';
import Nation from './Nation';
import Pill from '../indicator/Pill';
import HorizontalLine from '../shared/HorizontalLine';

const Card: Component<{ game: Game }> = (props) => {
    const game = () => props.game;

    const statusMapping = {
        'In progress': 'bg-green',
        Finished: 'bg-beige',
        Upcoming: 'bg-light-blue',
    };

    return (
        <div class='custom-gradient py-5 px-20 w-fit flex flex-col items-center min-w-[400px]'>
            <h3 class='text-silver font-medium'>{game().arena}</h3>
            <HorizontalLine style={`w-[70px] h-[3px] mb-3 ${statusMapping[game().status]}`} />
            <div class='flex gap-5'>
                <Nation nation={game().home.team} />
                <span class='text-4xl font-semibold mt-2'>
                    {game().home.score} : {game().away.score}
                </span>
                <Nation nation={game().away.team} />
            </div>
            <Pill status={game().status} />
        </div>
    );
};

export default Card;
