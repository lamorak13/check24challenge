import { Component, Show, onCleanup, onMount } from "solid-js";
import Header from "./Header";
import { Navigate, RouteSectionProps } from "@solidjs/router";
import { useUserNameContext } from "./UserNameContext";
import { ServerMessage } from "../utils/types/ServerMessage";
import { fetchers } from "../utils/useRealtimeRefetch";

const Layout: Component<RouteSectionProps<unknown>> = (props) => {
  const { name } = useUserNameContext();

  onMount(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onmessage = (event) => {
      if (event.data in ServerMessage) {
        fetchers.forEach((f) => f());
      }
    };
    onCleanup(() => socket.close());
  });

  return (
    <>
      <Header />
      <main class='px-[5%] py-5'>{props.children}</main>
      <Show when={name() == ""}>
        <Navigate href={"/signin"} />
      </Show>
    </>
  );
};

export default Layout;
