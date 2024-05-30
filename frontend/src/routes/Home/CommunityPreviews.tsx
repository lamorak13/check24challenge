import {
  Component,
  For,
  Show,
  createResource,
  onCleanup,
  onMount,
} from "solid-js";
import Carousel from "../../components/shared/Carousel";
import PreviewTable from "../../components/communities/PreviewTable";
import CommunityCard from "../../components/communities/CommunityCard";
import { useUserContext } from "../UserNameContext";
import { fetchCommunityPreviews } from "../../utils/api/rankings";
import { useRealtimeRefetch } from "../../utils/useRealtimeRefetch";
import { UserRanking } from "../../utils/types/UserRanking";
import { ServerMessage } from "../../utils/types/ServerMessage";

const UserCommunitySection: Component<{}> = () => {
  const { user } = useUserContext();
  const [previews, { refetch }] = createResource<
    { community: string; preview: UserRanking[] }[]
  >(() => fetchCommunityPreviews(user().name));

  const [subsribe, unsubscribe] = useRealtimeRefetch();
  onMount(() => subsribe(refetch, [ServerMessage["Game Finished"]]));
  onCleanup(() => unsubscribe(refetch, [ServerMessage["Game Finished"]]));

  return (
    <Show when={previews() != undefined}>
      <Carousel id='CommunityCarousel' itemWidth={500} buttonPosition='Bottom'>
        <For each={previews()}>
          {(p) => (
            <PreviewTable
              communityName={p.community}
              rankings={p.preview}
              userName={user().name}
            />
          )}
        </For>
        <Show when={previews()!.length < 5}>
          <CommunityCard
            refetch={refetch}
            numberOfCommunities={previews()!.length}
          />
        </Show>
      </Carousel>
    </Show>
  );
};

export default UserCommunitySection;
