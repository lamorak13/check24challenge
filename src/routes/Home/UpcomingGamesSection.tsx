import { Component, createSignal } from "solid-js";
import { GameStatus } from "../../utils/types/GameStatus";
import GameTable from "../../components/games/GameTable";
import { A } from "@solidjs/router";
import { RiArrowsArrowDropRightLine } from "solid-icons/ri";

const UpcomingGamesSection: Component<{}> = (props) => {
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

  return (
    <section class='w-fit'>
      <div class='flex justify-between'>
        <h3 class='mb-5'>Upcoming Games</h3>
        <A href='/games' class='no-underline'>
          <span>Look at all games</span>
          <RiArrowsArrowDropRightLine class='inline-block' size={30} />
        </A>
      </div>

      <GameTable games={games()} />
    </section>
  );
};

export default UpcomingGamesSection;
