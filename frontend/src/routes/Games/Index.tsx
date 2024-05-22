import { Component, Show, createResource, createSignal } from "solid-js";
import { GameStatus } from "../../utils/types/GameStatus";
import GameTable from "../../components/games/GameTable";
import { Game } from "../../utils/types/Game";
import { fetchAllGames } from "../../utils/api";
import { useUserNameContext } from "../UserNameContext";

const Games: Component<{}> = () => {
  const context = useUserNameContext();
  const [games, { mutate, refetch }] = createResource<Game[]>(() =>
    fetchAllGames(context.name() || "")
  );

  return (
    <Show when={games() != undefined}>
      <GameTable games={games()!} onSubmit={refetch} />
    </Show>
  );
};

export default Games;
