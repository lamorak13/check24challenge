import { Component, Show, createResource, onCleanup, onMount } from "solid-js";
import { A } from "@solidjs/router";
import { RiArrowsArrowDropRightLine } from "solid-icons/ri";
import UpcomingGamesTable from "../../components/games/UpcomingGamesTable.tsx";
import { Game } from "../../utils/types/Game.ts";
import { fetchUpcomingGames } from "../../utils/api/games.ts";
import { useUserNameContext } from "../UserNameContext.tsx";
import { useRealtimeRefetch } from "../../utils/useRealtimeRefetch.ts";

const UpcomingGames: Component<{}> = () => {
  const { name } = useUserNameContext();
  const [games, { refetch }] = createResource<Game[]>(() =>
    fetchUpcomingGames(name())
  );

  const [subsribe, unsubscribe] = useRealtimeRefetch();
  onMount(() => subsribe(refetch));
  onCleanup(() => unsubscribe(refetch));

  return (
    <section class='w-fit'>
      <div class='flex justify-between items-end mb-5'>
        <h2 class=' text-2xl '>Upcoming Games</h2>
        <A href='/games' class='no-underline'>
          <span>Look at all games</span>
          <RiArrowsArrowDropRightLine class='inline-block' size={30} />
        </A>
      </div>
      <Show when={games() != undefined}>
        <UpcomingGamesTable games={games()!} onSubmit={refetch} />
      </Show>
    </section>
  );
};

export default UpcomingGames;
