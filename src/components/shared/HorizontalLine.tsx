import { Component } from "solid-js";

const HorizontalLine: Component<{ style: string }> = (props) => {
  return (
    <div
      class={`bg-beige rounded-base h-[5px] w-[150px] mx-auto mt-3 mb-8 ${props.style}`}
    />
  );
};

export default HorizontalLine;
