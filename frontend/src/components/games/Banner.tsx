import { Component } from "solid-js";
import { Game } from "../../utils/types/Game";
import Pill from "../shared/Pill";
import getFlagEmoji from "../../utils/getFlagEmoji";
import ScoreDisplay from "./ScoreDisplay";
import DateDisplay from "./DateDisplay";
import { GameStatus } from "../../utils/types/GameStatus";

const Banner: Component<{ game: Game }> = (props) => {
  const statusMapping: Record<GameStatus, "green" | "blue" | "beige"> = {
    "In progress": "green",
    Finished: "beige",
    Upcoming: "blue",
  };

  return (
    <div class='custom-gradient flex justify-between items-center px-4 py-2 flex-shrink-0 snap-center w-[600px]'>
      <span class='text-silver'>
        <DateDisplay date={props.game.kickoff} />
      </span>
      <span class='uppercase font-semibold text-lg tracking-wider'>
        {getFlagEmoji(props.game.home, "text-2xl mr-2")}
        {props.game.home}
      </span>
      <ScoreDisplay score={props.game.score} />
      <span class='uppercase font-semibold text-lg tracking-wider'>
        {props.game.away}
        {getFlagEmoji(props.game.away, "text-2xl ml-2")}
      </span>
      <Pill color={statusMapping[props.game.status]} text={props.game.status} />
    </div>
  );
};

export default Banner;
