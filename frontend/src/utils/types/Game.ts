import { GameStatus } from "./GameStatus";
import { Score } from "./Score";

export type Game = {
  id: string;
  home: string;
  away: string;
  score: Score;
  kickoff: Date;
  status: GameStatus;
  bet: Score;
};
