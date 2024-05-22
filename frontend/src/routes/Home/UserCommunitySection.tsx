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
import CreateCpommunityCard from "../../components/communities/CreateCpommunityCard";
import { useUserNameContext } from "../UserNameContext";
import { Community } from "../../utils/types/Community";
import { fetchCommunities } from "../../utils/api";
import { useRealtimeRefetch } from "../../utils/useRealtimeRefetch";

const UserCommunitySection: Component<{}> = (props) => {
  const context = useUserNameContext();
  const [communities, { mutate, refetch }] = createResource<Community[]>(() =>
    fetchCommunities(context.name() || "")
  );

  const [subsribe, remove] = useRealtimeRefetch();

  onMount(() => subsribe(refetch));
  onCleanup(() => remove(refetch));

  return (
    <section>
      <Show when={communities() != undefined}>
        <Carousel itemWidth={500} buttonPosition='Botton'>
          <For each={communities()}>
            {(community) => <PreviewTable communityName={community.name} />}
          </For>
          <Show when={communities()!.length < 5}>
            <CreateCpommunityCard
              refetch={refetch}
              numberOfCommunities={communities()!.length}
            />
          </Show>
        </Carousel>
      </Show>
    </section>
  );
};

export default UserCommunitySection;
