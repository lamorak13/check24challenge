import { Component, createSignal } from "solid-js";
import { GameStatus } from "../../utils/types/GameStatus";
import { A } from "@solidjs/router";
import { RiArrowsArrowDropRightLine } from "solid-icons/ri";
import UpcomingGamesTable from "../../components/games/UpcomingGamesTable";
import { Game } from "../../utils/types/Game";

const UpcomingGamesSection: Component<{}> = (props) => {
  const [games, setGames] = createSignal<Game[]>([
    {
      home: "FRA",
      away: "ESP",
      score: { away: 2, home: 3 },
      status: GameStatus.UPCOMING,
      date: new Date("2024-05-12"),
      bet: undefined,
    },
    {
      home: "GER",
      away: "AUT",
      score: { away: 2, home: 3 },
      status: GameStatus.UPCOMING,
      date: new Date("2024-05-12"),
      bet: undefined,
    },
    {
      home: "ITA",
      away: "FIN",
      score: { away: 2, home: 3 },
      status: GameStatus.UPCOMING,
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

  return (
    <section class='w-fit'>
      <div class='flex justify-between'>
        <h3 class='mb-5'>Upcoming Games</h3>
        <A href='/games' class='no-underline'>
          <span>Look at all games</span>
          <RiArrowsArrowDropRightLine class='inline-block' size={30} />
        </A>
      </div>

      <UpcomingGamesTable games={games()} />
    </section>
  );
};

export default UpcomingGamesSection;
