import { Component, createSignal } from "solid-js";
import Carousel from "../components/shared/Carousel";
import Banner from "../components/games/Banner";
import { GameStatus } from "../utils/types/GameStatus";

const Header: Component<{}> = (props) => {
  const [game, setGame] = createSignal(
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
