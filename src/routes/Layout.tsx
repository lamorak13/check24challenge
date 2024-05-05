import { Component } from "solid-js";
import Header from "./Header";
import { RouteSectionProps } from "@solidjs/router";

const Layout: Component<RouteSectionProps<unknown>> = (props) => {
  return (
    <>
      <Header />
      <main class='px-[5%] py-5'>{props.children}</main>
    </>
  );
};

export default Layout;
