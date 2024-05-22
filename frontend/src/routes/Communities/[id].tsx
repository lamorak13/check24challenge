import { Component, Show, createResource } from "solid-js";
import { UserRanking } from "../../utils/types/UserRanking";
import RankingTable from "../../components/communities/RankingTable";
import PinnedRankingTable from "../../components/communities/PinnedRankingTable";
import { deletePin, fetchCommunityRanking, pinUser } from "../../utils/api";
import { useParams } from "@solidjs/router";
import { useUserNameContext } from "../UserNameContext";

const Community: Component = () => {
  const { name } = useUserNameContext();
  const params = useParams();
  const [rankings, { mutate, refetch }] = createResource<UserRanking[]>(() =>
    fetchCommunityRanking(params.id, name() || "")
  );

  async function handlePinUser(ranking: UserRanking) {
    if (ranking.pinned) {
      await deletePin(name() || "", ranking.name, params.id);
    } else {
      await pinUser(name() || "", ranking.name, params.id);
    }
    refetch();
  }

  return (
    <section class='flex justify-between'>
      <div>
        <h3 class='mb-5'>Pinned Users</h3>
        <Show when={rankings() != undefined}>
          <PinnedRankingTable rankings={rankings()!} />
        </Show>
      </div>

      <div>
        <h3 class='mb-5'>All Users</h3>
        <Show when={rankings() != undefined}>
          <RankingTable rankings={rankings()!} handlePinUser={handlePinUser} />
        </Show>
      </div>
    </section>
  );
};

export default Community;
