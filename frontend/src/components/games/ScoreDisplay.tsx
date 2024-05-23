import { Component, Show } from "solid-js";
import { Score } from "../../utils/types/Score";

const ScoreDisplay: Component<{ score: Score }> = (props) => {
  return (
    <span class='px-3 text-xl font-semibold'>
      <Show when={props.score != null} fallback={"- : -"}>
        {props.score!.home} : {props.score!.away}
      </Show>
    </span>
  );
};

export default ScoreDisplay;
