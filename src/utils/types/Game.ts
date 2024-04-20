import { GameStatus } from './GameStatus';

export type Game = {
    home: {
        team: string;
        score: number;
    };
    away: {
        team: string;
        score: number;
    };
    arena: string;
    status: GameStatus;
};
