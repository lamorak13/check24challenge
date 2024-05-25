import { Component, Show, onCleanup, onMount } from "solid-js";
import Header from "./Header";
import { Navigate, RouteSectionProps } from "@solidjs/router";
import { useUserNameContext } from "./UserNameContext";
import { ServerMessage } from "../utils/types/ServerMessage";
import { runSubsriber } from "../utils/useRealtimeRefetch";
import NotificationContainer from "../components/shared/NotificationContainer";

const Layout: Component<RouteSectionProps<unknown>> = (props) => {
  const { name } = useUserNameContext();

  onMount(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onmessage = (event) => {
      if (event.data in ServerMessage) {
        runSubsriber(event.data);
      }
    };
    onCleanup(() => socket.close());
  });

  return (
    <>
      <Header />
      <main class='px-[5%] py-5 pt-[130px]'>{props.children}</main>
      <Show when={name() == ""}>
        <Navigate href={"/signin"} />
      </Show>
      <NotificationContainer />
    </>
  );
};

export default Layout;
