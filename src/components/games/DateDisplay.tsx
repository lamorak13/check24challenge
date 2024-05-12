import { Component } from "solid-js";

const DateDisplay: Component<{ date: Date }> = (props) => {
  return (
    <>
      {props.date.getDate().toString().padStart(2, "0")}.
      {props.date.getMonth().toString().padStart(2, "0")}
      {" | "}
      {props.date.getHours().toString().padStart(2, "0")}:
      {props.date.getMinutes().toString().padStart(2, "0")}
    </>
  );
};

export default DateDisplay;
