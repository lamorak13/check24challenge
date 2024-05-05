import { Component, createSignal } from "solid-js";
import {
  RiArrowsArrowDropRightLine,
  RiArrowsArrowDropLeftLine,
} from "solid-icons/ri";
import Card from "../../components/games/Card";
import { GameStatus } from "../../utils/types/GameStatus";
import Banner from "../../components/games/Banner";
import Carousel from "../../components/shared/Carousel";

const Game: Component<{}> = (props) => {
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
    <section class=''>
      <Card game={game()} />

      <Carousel itemWidth={400} style='!w-[700px]' buttonSize={30}>
        <Banner game={game()} />
        <Banner game={game()} />
        <Banner game={game()} />
      </Carousel>
    </section>
  );
};

export default Game;
