import { Component } from "solid-js";
import { GameStatus } from "../../utils/types/GameStatus";

const Pill: Component<{ status: GameStatus }> = (props) => {
  const statusMapping = {
    "In progress": "text-green border-green bg-green/10",
    Finished: "text-beige border-beige bg-beige/10",
    Upcoming: "text-light-blue border-light-blue bg-light-blue/10",
  };

  return (
    <span
      class={`text-sm rounded-3xl py-[2px] px-5 border-2 min-w-[120px] text-center ${
        statusMapping[props.status]
      }`}>
      {props.status}
    </span>
  );
};

export default Pill;
