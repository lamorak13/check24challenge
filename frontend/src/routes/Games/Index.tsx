import { Component, Show, createResource, onCleanup, onMount } from "solid-js";
import GameTable from "../../components/games/GameTable";
import { Game } from "../../utils/types/Game";
import { fetchAllGames } from "../../utils/api";
import { useUserNameContext } from "../UserNameContext";
import { useRealtimeRefetch } from "../../utils/useRealtimeRefetch";

const Games: Component<{}> = () => {
  const { name } = useUserNameContext();
  const [games, { refetch }] = createResource<Game[]>(() =>
    fetchAllGames(name())
  );

  const [subsribe, remove] = useRealtimeRefetch();
  onMount(() => subsribe(refetch));
  onCleanup(() => remove(refetch));

  return (
    <Show when={games() != undefined}>
      <GameTable games={games()!} onSubmit={refetch} />
    </Show>
  );
};

export default Games;
