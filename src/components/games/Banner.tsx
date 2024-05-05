import { Component } from "solid-js";
import { Game } from "../../utils/types/Game";
import Pill from "../shared/Pill";
import getFlagEmoji from "../../utils/getFlagEmoji";

const Banner: Component<{ game: Game }> = (props) => {
  return (
    <div class='custom-gradient flex justify-between items-center gap-10 px-4 py-2 flex-shrink-0 snap-center'>
      <span class='text-silver'>{props.game.arena}</span>
      <span class='uppercase font-semibold text-lg tracking-wider'>
        {getFlagEmoji(props.game.home.team, "text-2xl mr-2")}
        {props.game.home.team}
      </span>
      <span class='px-3 text-xl font-semibold'>
        {props.game.away.score} : {props.game.away.score}
      </span>
      <span class='uppercase font-semibold text-lg tracking-wider'>
        {props.game.away.team}
        {getFlagEmoji(props.game.away.team, "text-2xl ml-2")}
      </span>
      <Pill status={props.game.status} />
    </div>
  );
};

export default Banner;
