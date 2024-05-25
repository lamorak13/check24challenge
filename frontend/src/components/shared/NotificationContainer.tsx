import { Component, For, createSignal, onCleanup, onMount } from "solid-js";
import { useRealtimeRefetch } from "../../utils/useRealtimeRefetch";
import {
  UserNotification,
  MessageType,
} from "../../utils/types/UserNotification";
import Notification from "./Notification";
import { ServerMessage } from "../../utils/types/ServerMessage";

const NotificationContainer: Component<{}> = (props) => {
  const [notifications, setNotifications] = createSignal<UserNotification[]>(
    []
  );

  function addNotification(notification: UserNotification) {
    setNotifications((n) => [...n, notification]);
  }

  function removeNotification(notification: UserNotification) {
    setNotifications((n) => n.filter((m) => m != notification));
  }

  function getNotificationFromServerMessage(message: ServerMessage) {
    switch (message) {
      case ServerMessage["Game Started"]:
        addNotification({
          type: MessageType.UPDATE,
          message: "New game just started!",
        });
        break;
      case ServerMessage["Game Score"]:
        addNotification({
          type: MessageType.UPDATE,
          message: "GOAL! Take a look at the score.",
        });
        break;
      case ServerMessage["Game Finished"]:
        addNotification({
          type: MessageType.UPDATE,
          message: "Final whistle, the game is over!",
        });
        break;
    }
  }
  /* 
  setInterval(() => {
    addNotification({
      type: MessageType.WARNING,
      message: Math.random().toString(36).substring(2, 7),
    });
  }, 1000); */
  const [subscribe, unsubscribe] = useRealtimeRefetch();
  onMount(() => subscribe(getNotificationFromServerMessage));
  onCleanup(() => unsubscribe(getNotificationFromServerMessage));

  return (
    <div class='fixed p-5 right-0 bottom-0 flex flex-col-reverse gap-2'>
      <For each={notifications()}>
        {(notification) => (
          <Notification
            notification={notification}
            remove={removeNotification}
          />
        )}
      </For>
    </div>
  );
};

export default NotificationContainer;
