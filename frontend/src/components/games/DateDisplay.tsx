import { Component } from "solid-js";

const DateDisplay: Component<{ date: Date }> = (props) => {
  return (
    <>
      {props.date.getUTCDate().toString().padStart(2, "0")}.
      {(props.date.getUTCMonth() + 1).toString().padStart(2, "0")}
      {" | "}
      {props.date.getUTCHours().toString().padStart(2, "0")}:
      {props.date.getMinutes().toString().padStart(2, "0")}
    </>
  );
};

export default DateDisplay;
