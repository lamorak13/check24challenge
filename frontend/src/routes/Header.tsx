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
import { fetchInProgressGames } from "../utils/api/games";
import { A, useNavigate } from "@solidjs/router";
import EmptyBanner from "../components/games/EmptyBanner";
import { useRealtimeRefetch } from "../utils/useRealtimeRefetch";
import { RiUserFacesAccountCircleLine } from "solid-icons/ri";

const Header: Component<{}> = () => {
  const [games, { refetch }] = createResource<Game[]>(fetchInProgressGames);
  const navigate = useNavigate();

  const [subsribe, remove] = useRealtimeRefetch();
  onMount(() => subsribe(refetch));
  onCleanup(() => remove(refetch));

  return (
    <header class='fixed bg-black z-10 w-full'>
      <div class='flex justify-between px-[5%] items-center py-5 border-b-2 border-b-silver/10 z-10'>
        <div class='flex items-center'>
          <button class='mr-8' onClick={() => navigate("/signin")}>
            <RiUserFacesAccountCircleLine
              size={40}
              class='block text-white/80 hover:text-silver'
            />
          </button>
          <A href='/'>
            <h3>GenDev Betting Challenge</h3>
          </A>
        </div>

        <Carousel
          itemWidth={400}
          style='!w-[700px]'
          buttonSize={30}
          buttonPosition='Side'>
          <Show
            when={games() != undefined && games()!.length > 0}
            fallback={<EmptyBanner />}>
            <For each={games()}>{(game) => <Banner game={game} />}</For>
          </Show>
        </Carousel>
      </div>
    </header>
  );
};

export default Header;
