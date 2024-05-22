import {
  Component,
  Show,
  createResource,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";
import { A } from "@solidjs/router";
import { RiArrowsArrowDropRightLine } from "solid-icons/ri";
import UpcomingGamesTable from "../../components/games/UpcomingGamesTable";
import { Game } from "../../utils/types/Game";
import { fetchUpcomingGames } from "../../utils/api.ts";
import { useUserNameContext } from "../UserNameContext.tsx";
import { useRealtimeRefetch } from "../../utils/useRealtimeRefetch.ts";

const UpcomingGamesSection: Component<{}> = (props) => {
  const context = useUserNameContext();
  const [games, { mutate, refetch }] = createResource<Game[]>(() =>
    fetchUpcomingGames(context.name() || "")
  );

  const [subsribe, remove] = useRealtimeRefetch();

  onMount(() => subsribe(refetch));
  onCleanup(() => remove(refetch));

  return (
    <section class='w-fit'>
      <div class='flex justify-between'>
        <h3 class='mb-5'>Upcoming Games</h3>
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

export default UpcomingGamesSection;
