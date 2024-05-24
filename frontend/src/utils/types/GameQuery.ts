import { GameStatus } from "./GameStatus";

export type GameQuery = {
  kickoff: Date | "";
  team: string;
  bet: boolean;
  status: GameStatus | "";
};
