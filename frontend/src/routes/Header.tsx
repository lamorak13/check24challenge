import {
  Component,
  For,
  Show,
  createResource,
  onCleanup,
  onMount,
} from "solid-js";
import Carousel from "../components/shared/Carousel";
import Banner from "../components/games/Banner";
import { Game } from "../utils/types/Game";
import { fetchInProgressGames } from "../utils/api";
import { A } from "@solidjs/router";
import EmptyBanner from "../components/games/EmptyBanner";
import { useRealtimeRefetch } from "../utils/useRealtimeRefetch";

const Header: Component<{}> = (props) => {
  const [games, { mutate, refetch }] =
    createResource<Game[]>(fetchInProgressGames);

  const [subsribe, remove] = useRealtimeRefetch();

  onMount(() => subsribe(refetch));
  onCleanup(() => remove(refetch));

  return (
    <header class='flex justify-between px-[5%] items-center py-5 border-b-2 border-b-silver/10'>
      <A href='/'>
        <h3>GenDev Betting Challenge</h3>
      </A>

      <Carousel itemWidth={400} style='!w-[700px]' buttonSize={30}>
        <Show
          when={games() != undefined && games()!.length > 0}
          fallback={<EmptyBanner />}>
          <For each={games()}>{(game) => <Banner game={game} />}</For>
        </Show>
      </Carousel>
    </header>
  );
};

export default Header;
