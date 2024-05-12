import { Component } from "solid-js";

const Pill: Component<{
  color: "green" | "blue" | "beige";
  text: string;
  onClick?: () => void;
}> = (props) => {
  const colorMapping = {
    green: "text-green border-green bg-green/10",
    beige: "text-beige border-beige bg-beige/10",
    blue: "text-light-blue border-light-blue bg-light-blue/10",
  };

  return (
    <span
      onClick={props.onClick}
      class={`text-sm rounded-3xl py-[2px] px-5 border-2 min-w-[120px] text-center ${
        colorMapping[props.color]
      } ${props.onClick && "cursor-pointer"}`}>
      {props.text}
    </span>
  );
};

export default Pill;
