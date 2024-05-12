import { Component } from "solid-js";
import { Game } from "../../utils/types/Game";
import Nation from "./Nation";
import Pill from "../shared/Pill";
import { GameStatus } from "../../utils/types/GameStatus";

const Card: Component<{ game: Game }> = (props) => {
  const statusMapping: Record<GameStatus, "green" | "blue" | "beige"> = {
    "In progress": "green",
    Finished: "beige",
    Upcoming: "blue",
  };

  return (
    <div class='custom-gradient py-5 px-20 flex flex-col items-center w-[400px] flex-shrink-0 snap-center'>
      <div class='flex gap-5 mb-5'>
        <Nation nation={props.game.home.team} />
        <span class='text-4xl font-semibold mt-2'>
          {props.game.home.score} : {props.game.away.score}
        </span>
        <Nation nation={props.game.away.team} />
      </div>
      <Pill color={statusMapping[props.game.status]} text={props.game.status} />
    </div>
  );
};

export default Card;
