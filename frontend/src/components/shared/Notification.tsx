import { Component } from "solid-js";
import {
  MessageType,
  UserNotification,
} from "../../utils/types/UserNotification";
import { RiSystemCloseFill } from "solid-icons/ri";

const Notification: Component<{
  notification: UserNotification;
  remove: (n: UserNotification) => void;
}> = (props) => {
  const typeToBorder = {
    Update: "border-l-beige",
    Warning: "border-l-yellow",
    Error: "border-l-red",
    Success: "border-l-green",
  };

  const typeToColor = {
    Update: "text-beige",
    Warning: "text-yellow",
    Error: "text-red",
    Success: "text-green",
  };

  setTimeout(() => props.remove(props.notification), 5000);

  return (
    <div
      class={`relative rounded-base border-2 border-l-4 border-silver/15 px-5 py-5 w-[400px] bg-black ${
        typeToBorder[props.notification.type]
      }`}>
      <span class={`block mb-3 ${typeToColor[props.notification.type]}`}>
        {props.notification.type}
      </span>
      <p>{props.notification.message}</p>
      <button
        onClick={() => props.remove(props.notification)}
        class='absolute p-2 top-2 right-2'>
        <RiSystemCloseFill />
      </button>
    </div>
  );
};

export default Notification;
