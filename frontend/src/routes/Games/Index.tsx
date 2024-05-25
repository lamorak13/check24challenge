import {
  Component,
  Show,
  createResource,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import GameTable from "../../components/games/GameTable";
import { fetchAllGames } from "../../utils/api/games";
import { useUserNameContext } from "../UserNameContext";
import { useRealtimeRefetch } from "../../utils/useRealtimeRefetch";
import SearchForGames from "./SearchForGames";
import { GameQuery } from "../../utils/types/GameQuery";

const Games: Component<{}> = () => {
  const { name } = useUserNameContext();
  const [query, setQuery] = createSignal<GameQuery>({
    kickoff: "",
    team: "",
    bet: false,
    status: "",
  });
  const [games, { refetch }] = createResource(query, (query: GameQuery) =>
    fetchAllGames(query, name())
  );

  const [subsribe, unsubscribe] = useRealtimeRefetch();
  onMount(() => subsribe(refetch));
  onCleanup(() => unsubscribe(refetch));

  return (
    <>
      <SearchForGames setQuery={setQuery} />
      <Show when={games() != undefined}>
        <GameTable games={games()!} onSubmit={refetch} />
      </Show>
    </>
  );
};

export default Games;
