import { RouteSectionProps } from "@solidjs/router";
import { Component } from "solid-js";

const Layout: Component<RouteSectionProps<unknown>> = (props) => {
  return (
    <section class='grid justify-center items-center h-[calc(100vh-140px)]'>
      <div class='flex flex-col gap-2 py-16 px-12 min-w-[500px] custom-gradient'>
        {props.children}
      </div>
    </section>
  );
};

export default Layout;
