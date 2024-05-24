import { Component, Show, createResource, onCleanup, onMount } from "solid-js";
import { UserRanking } from "../../utils/types/UserRanking";
import RankingTable from "../../components/communities/RankingTable";
import PinnedRankingTable from "../../components/communities/PinnedRankingTable";
import {
  deletePin,
  fetchCommunityRanking,
  fetchCommunityRankingPinnedUser,
  pinUser,
} from "../../utils/api";
import { useParams } from "@solidjs/router";
import { useUserNameContext } from "../UserNameContext";
import { useRealtimeRefetch } from "../../utils/useRealtimeRefetch";
import SearchForUser from "./SearchForUser";

const Community: Component = () => {
  const { name } = useUserNameContext();
  const params = useParams();
  const [rankings, manageRankings] = createResource<UserRanking[]>(() =>
    fetchCommunityRanking(params.id, name())
  );
  const [pinnedRankings, managePinnedRankings] = createResource<UserRanking[]>(
    () => fetchCommunityRankingPinnedUser(params.id, name())
  );

  const [subsribe, remove] = useRealtimeRefetch();
  onMount(() => subsribe(managePinnedRankings.refetch));
  onCleanup(() => remove(managePinnedRankings.refetch));

  async function handlePinUser(ranking: UserRanking) {
    if (ranking.pinned) {
      await deletePin(name(), ranking.name, params.id);
    } else {
      await pinUser(name(), ranking.name, params.id);
    }
    managePinnedRankings.refetch();
  }

  return (
    <section class='flex justify-between'>
      <div>
        <SearchForUser
          handlePinUser={handlePinUser}
          communityName={params.id}
        />
        <h3 class='mb-5'>Pinned Users</h3>
        <Show when={pinnedRankings() != undefined}>
          <PinnedRankingTable
            rankings={pinnedRankings()!}
            handlePinUser={handlePinUser}
          />
        </Show>
      </div>

      <div>
        <h3 class='mb-5'>All Users</h3>
        <Show when={rankings() != undefined}>
          <RankingTable
            rankings={rankings()!}
            handlePinUser={handlePinUser}
            communityName={params.id}
            userName={name()}
            mutate={manageRankings.mutate}
            refetch={manageRankings.refetch}
          />
        </Show>
      </div>
    </section>
  );
};

export default Community;
