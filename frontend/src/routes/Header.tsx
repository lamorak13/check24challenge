import { Component, For, Show, createResource } from "solid-js";
import Carousel from "../components/shared/Carousel";
import Banner from "../components/games/Banner";
import { Game } from "../utils/types/Game";
import { fetchInProgressGames } from "../utils/api";
import { A } from "@solidjs/router";

const Header: Component<{}> = (props) => {
  const [games, { mutate, refetch }] =
    createResource<Game[]>(fetchInProgressGames);

  return (
    <header class='flex justify-between px-[5%] items-center py-5 border-b-2 border-b-silver/10'>
      <A href='/'>
        <h3>GenDev Betting Challenge</h3>
      </A>
      <Show when={games() != undefined}>
        <Carousel itemWidth={400} style='!w-[700px]' buttonSize={30}>
          <For each={games()}>{(game) => <Banner game={game} />}</For>
        </Carousel>
      </Show>
    </header>
  );
};

export default Header;
