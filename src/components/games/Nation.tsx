import { Component } from "solid-js";
import getFlagEmoji from "../../utils/getFlagEmoji";

const Nation: Component<{ nation: string }> = (props) => {
  return (
    <div class='flex flex-col items-center'>
      {getFlagEmoji(props.nation, "text-5xl")}
      <span class='text-xl font-semibold uppercase tracking-wider'>
        {props.nation}
      </span>
    </div>
  );
};

export default Nation;
