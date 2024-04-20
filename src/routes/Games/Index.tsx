import { Component, createSignal } from 'solid-js';
import { GameStatus } from '../../utils/types/GameStatus';
import Table from '../../components/games/Table';

const Games: Component<{}> = (props) => {
    const [games, setGames] = createSignal([
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
    ]);

    return <Table games={games()} />;
};

export default Games;
