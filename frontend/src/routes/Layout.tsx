import { Component, createEffect } from "solid-js";
import Header from "./Header";
import { RouteSectionProps, useNavigate } from "@solidjs/router";
import { useUserNameContext } from "./UserNameContext";
import { ServerMessage } from "../utils/types/ServerMessage";
import { fetchers } from "../utils/useRealtimeRefetch";

const Layout: Component<RouteSectionProps<unknown>> = (props) => {
  const { name } = useUserNameContext();
  const navigate = useNavigate();
  createEffect(() => {
    if (name() == undefined) navigate("/signin", { replace: true });
  });

  const socket = new WebSocket("ws://localhost:8080");

  socket.onmessage = (event) => {
    if (event.data in ServerMessage) {
      fetchers.forEach((f) => f());
    }
  };

  return (
    <>
      <Header />
      <main class='px-[5%] py-5'>{props.children}</main>
    </>
  );
};

export default Layout;
