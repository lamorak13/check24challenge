import { IconTypes } from "solid-icons";
import { Component } from "solid-js";

const CarouselButton: Component<{
  onClick: () => void;
  buttonSize?: number;
  Icon: IconTypes;
}> = (props) => {
  return (
    <button
      onClick={props.onClick}
      class='border-light-blue border-2 rounded-full hover:bg-light-blue/10'>
      <props.Icon size={props.buttonSize || 40} class='text-light-blue' />
    </button>
  );
};

export default CarouselButton;
