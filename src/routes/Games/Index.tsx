import { Component, createSignal } from "solid-js";
import { GameStatus } from "../../utils/types/GameStatus";
import GameTable from "../../components/games/GameTable";

const Games: Component<{}> = () => {
  const [games, setGames] = createSignal([
    {
      home: {
        score: 3,
        team: "GER",
      },
      away: {
        score: 2,
        team: "ESP",
      },
      status: GameStatus.UPCOMING,
      arena: "BVB Stadion Dortmund",
    },
    {
      home: {
        score: 3,
        team: "GER",
      },
      away: {
        score: 2,
        team: "ESP",
      },
      status: GameStatus.UPCOMING,
      arena: "BVB Stadion Dortmund",
    },
    {
      home: {
        score: 3,
        team: "GER",
      },
      away: {
        score: 2,
        team: "ESP",
      },
      status: GameStatus.UPCOMING,
      arena: "BVB Stadion Dortmund",
    },
    {
      home: {
        score: 3,
        team: "GER",
      },
      away: {
        score: 2,
        team: "ESP",
      },
      status: GameStatus.UPCOMING,
      arena: "BVB Stadion Dortmund",
    },
  ]);

  return <GameTable games={games()} />;
};

export default Games;
