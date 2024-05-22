import { Component, createEffect } from "solid-js";
import Header from "./Header";
import { RouteSectionProps, useNavigate } from "@solidjs/router";
import { useUserNameContext } from "./UserNameContext";

const Layout: Component<RouteSectionProps<unknown>> = (props) => {
  const { name } = useUserNameContext();
  const navigate = useNavigate();
  createEffect(() => {
    if (name() == undefined) navigate("/signin", { replace: true });
  });

  return (
    <>
      <Header />
      <main class='px-[5%] py-5'>{props.children}</main>
    </>
  );
};

export default Layout;
