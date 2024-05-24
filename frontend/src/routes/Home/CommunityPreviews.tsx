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
import { useUserNameContext } from "../UserNameContext";
import { fetchCommunityPreviews } from "../../utils/api/rankings";
import { useRealtimeRefetch } from "../../utils/useRealtimeRefetch";
import { UserRanking } from "../../utils/types/UserRanking";

const UserCommunitySection: Component<{}> = () => {
  const { name } = useUserNameContext();
  const [previews, { refetch }] = createResource<
    { community: string; preview: UserRanking[] }[]
  >(() => fetchCommunityPreviews(name()));

  const [subsribe, remove] = useRealtimeRefetch();
  onMount(() => subsribe(refetch));
  onCleanup(() => remove(refetch));

  return (
    <Show when={previews() != undefined}>
      <Carousel itemWidth={500} buttonPosition='Bottom'>
        <For each={previews()}>
          {(p) => (
            <PreviewTable
              communityName={p.community}
              rankings={p.preview}
              userName={name()}
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
