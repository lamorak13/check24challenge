import { GameStatus } from "./GameStatus";
import { Score } from "./Score";

export type Game = {
  home: string;
  away: string;
  score: Score;
  date: Date;
  status: GameStatus;
  bet: Score | undefined;
};
