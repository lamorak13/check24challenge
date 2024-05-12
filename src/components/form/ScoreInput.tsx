import { Component } from "solid-js";

const ScoreInput: Component<{
  value: number;
  onInput: (n: number) => void;
}> = (props) => {
  return (
    <input
      value={props.value}
      type='number'
      onInput={(e) => props.onInput(e.target.valueAsNumber)}
      class='w-[80px] text-center bg-white/10 border-beige/10 border-2 rounded-base py-3 px-5 placeholder-white'
    />
  );
};

export default ScoreInput;
