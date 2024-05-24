import { Component } from "solid-js";

const Button: Component<{
  text: string;
  type?: "Primary" | "Secondary";
  onClick?: () => void;
  style?: string;
}> = (props) => {
  return (
    <button
      class={`${
        !props.type || props.type == "Primary" ? "bg-light-blue" : "bg-white/10"
      } border-2 rounded-base border-beige/20 px-5 py-2 text-xl font-semibold ${
        props.style
      }`}
      onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button;
