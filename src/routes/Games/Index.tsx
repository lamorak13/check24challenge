import { Component, createSignal } from "solid-js";
import { GameStatus } from "../../utils/types/GameStatus";
import GameTable from "../../components/games/GameTable";
import { Game } from "../../utils/types/Game";

const Games: Component<{}> = () => {
  const [games, setGames] = createSignal<Game[]>([
    {
      home: "FRA",
      away: "ESP",
      score: { away: 2, home: 3 },
      status: GameStatus.FINISHED,
      date: new Date("2024-05-12"),
      bet: undefined,
    },
    {
      home: "FRA",
      away: "ESP",
      score: { away: 2, home: 3 },
      status: GameStatus.UPCOMING,
      date: new Date("2024-05-12"),
      bet: undefined,
    },
    {
      home: "FRA",
      away: "ESP",
      score: { away: 2, home: 3 },
      status: GameStatus.IN_PROGRESS,
      date: new Date("2024-05-12"),
      bet: undefined,
    },
    {
      home: "FRA",
      away: "ESP",
      score: { away: 2, home: 3 },
      status: GameStatus.FINISHED,
      date: new Date("2024-05-12"),
      bet: undefined,
    },
    {
      home: "FRA",
      away: "ESP",
      score: { away: 2, home: 3 },
      status: GameStatus.UPCOMING,
      date: new Date("2024-05-12"),
      bet: { home: 5, away: 1 },
    },
    {
      home: "FRA",
      away: "ESP",
      score: { away: 2, home: 3 },
      status: GameStatus.UPCOMING,
      date: new Date("2024-05-12"),
      bet: undefined,
    },
  ]);

  return <GameTable games={games()} />;
};

export default Games;
