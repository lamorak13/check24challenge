import { Component, Show } from "solid-js";
import { Score } from "../../utils/types/Score";

const ScoreDisplay: Component<{ score: Score | undefined }> = (props) => {
  return (
    <span class='px-3 text-xl font-semibold'>
      <Show when={props.score} fallback={"- : -"}>
        {props.score!.away} : {props.score!.home}
      </Show>
    </span>
  );
};

export default ScoreDisplay;
