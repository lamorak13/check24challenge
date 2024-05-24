import { Component } from "solid-js";

const Checkbox: Component<{
  id: string;
  isChecked: boolean;
  onChange: () => void;
}> = (props) => {
  return (
    <input
      id={props.id}
      type='checkbox'
      checked={props.isChecked}
      onChange={props.onChange}
      class='w-[20px] aspect-square'
    />
  );
};

export default Checkbox;
