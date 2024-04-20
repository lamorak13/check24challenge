import { Component, For } from 'solid-js';
import { Game } from '../../utils/types/Game';
import Pill from '../indicator/Pill';
import getFlagEmoji from '../../utils/types/getFlagEmoji';

const Table: Component<{ games: Game[] }> = (props) => {
    return (
        <table class='w-[700px] custom-gradient rounded-sm'>
            <thead class='text-left bg-black uppercase tracking-widest text-silver '>
                <tr>
                    <th class=' px-4 py-3 font-semibold'>Staduim</th>
                    <th class='font-semibold'>Home</th>
                    <th />
                    <th class='font-semibold'>Away</th>
                    <th class='font-semibold'>Status</th>
                </tr>
            </thead>
            <tbody>
                <For each={props.games}>
                    {(game, index) => (
                        <tr class='border-b border-silver/10'>
                            <td class='pl-4 py-4 text-silver'>{game.arena}</td>
                            <td class='uppercase font-semibold text-lg tracking-wider'>
                                <span class='text-2xl mr-2'>{getFlagEmoji(game.home.team)}</span> {game.home.team}
                            </td>
                            <td class='px-3 text-xl font-semibold'>
                                {game.away.score} : {game.away.score}
                            </td>
                            <td class='uppercase font-semibold text-lg tracking-wider'>
                                {game.away.team} <span class='text-2xl ml-2'>{getFlagEmoji(game.away.team)}</span>
                            </td>
                            <td>
                                <Pill status={game.status} />
                            </td>
                        </tr>
                    )}
                </For>
            </tbody>
        </table>
    );
};

export default Table;
