import { Component } from "solid-js";
import PreviewTable from "../../components/groups/PreviewTable";
import Carousel from "../../components/shared/Carousel";
import Card from "../../components/games/Card";
import { GameStatus } from "../../utils/types/GameStatus";

const Community: Component = () => {
  const game = {
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
  };

  return (
    <section>
      <Carousel itemWidth={400}>
        <PreviewTable />
        <PreviewTable />
        <PreviewTable />
      </Carousel>
      <Carousel itemWidth={300}>
        <Card game={game} />
        <Card game={game} />
        <Card game={game} />
      </Carousel>
    </section>
  );
};

export default Community;
