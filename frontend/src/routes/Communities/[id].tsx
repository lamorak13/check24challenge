import { Component, Show, createResource, onCleanup, onMount } from "solid-js";
import { UserRanking } from "../../utils/types/UserRanking";
import RankingTable from "../../components/communities/RankingTable";
import SimpleRankingTable from "../../components/communities/SimpleRankingTable";
import { togglePin } from "../../utils/api/pins";
import {
  fetchCommunityRanking,
  fetchCommunityRankingPinnedUser,
} from "../../utils/api/rankings";
import { useParams } from "@solidjs/router";
import { useUserContext } from "../UserNameContext";
import { useRealtimeRefetch } from "../../utils/useRealtimeRefetch";
import SearchForUser from "./SearchForUser";
import { ServerMessage } from "../../utils/types/ServerMessage";

const Community: Component = () => {
  const { user } = useUserContext();
  const params = useParams();
  const [rankings, manageRankings] = createResource<UserRanking[]>(() =>
    fetchCommunityRanking(params.id, user().name)
  );
  const [pinnedRankings, managePinnedRankings] = createResource<UserRanking[]>(
    () => fetchCommunityRankingPinnedUser(params.id, user().name)
  );

  const [subsribe, unsubscribe] = useRealtimeRefetch();
  onMount(() =>
    subsribe(managePinnedRankings.refetch, [ServerMessage["Game Finished"]])
  );
  onCleanup(() =>
    unsubscribe(managePinnedRankings.refetch, [ServerMessage["Game Finished"]])
  );

  async function handlePinUser(ranking: UserRanking) {
    await togglePin(user().name, ranking.name, params.id);
    managePinnedRankings.refetch();
  }

  return (
    <section class='flex justify-between'>
      <div class='sticky top-[150px] h-fit'>
        <SearchForUser
          handlePinUser={handlePinUser}
          communityName={params.id}
        />
        <h3 class='mb-5'>Pinned Users</h3>
        <Show when={pinnedRankings() != undefined}>
          <SimpleRankingTable
            rankings={pinnedRankings()!}
            handlePinUser={handlePinUser}
          />
        </Show>
      </div>

      <Show when={rankings() != undefined}>
        <RankingTable
          rankings={rankings()!}
          handlePinUser={handlePinUser}
          communityName={params.id}
          userName={user().name}
          mutate={manageRankings.mutate}
          refetch={manageRankings.refetch}
        />
      </Show>
    </section>
  );
};

export default Community;
