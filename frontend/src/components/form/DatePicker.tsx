import { Component } from "solid-js";

const DatePicker: Component<{
  value: Date | "";
  setValue: (s: string) => void;
  id: string;
}> = (props) => {
  return (
    <input
      id={props.id}
      type='date'
      value={props.value == "" ? "" : props.value.toISOString().split("T")[0]}
      onChange={(e) => props.setValue(e.target.value)}
      class=' bg-white/10 border-beige/10 border-2 rounded-base py-3 px-5 placeholder-white flex-grow'
    />
  );
};

export default DatePicker;
