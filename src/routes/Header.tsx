import { Component, createSignal } from "solid-js";
import Carousel from "../components/shared/Carousel";
import Banner from "../components/games/Banner";
import { GameStatus } from "../utils/types/GameStatus";
import { Game } from "../utils/types/Game";

const Header: Component<{}> = (props) => {
  const [game, setGame] = createSignal<Game>(
    {
      home: "FRA",
      away: "ESP",
      score: { away: 2, home: 3 },
      status: GameStatus.UPCOMING,
      date: new Date("2024-05-12"),
      bet: undefined,
    },
    { equals: false }
  );

  return (
    <header class='flex justify-between px-[5%] items-center py-5 border-b-2 border-b-silver/10'>
      <h3>GenDev Betting Challenge</h3>
      <Carousel itemWidth={400} style='!w-[700px]' buttonSize={30}>
        <Banner game={game()} />
        <Banner game={game()} />
        <Banner game={game()} />
      </Carousel>
    </header>
  );
};

export default Header;
