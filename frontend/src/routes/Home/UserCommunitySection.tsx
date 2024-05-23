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
import { fetchCommunityPreview } from "../../utils/api";
import { useRealtimeRefetch } from "../../utils/useRealtimeRefetch";
import { UserRanking } from "../../utils/types/UserRanking";

const UserCommunitySection: Component<{}> = (props) => {
  const context = useUserNameContext();
  const [previews, { mutate, refetch }] = createResource<
    { community: string; preview: UserRanking[] }[]
  >(() => fetchCommunityPreview(context.name() || ""));

  const [subsribe, remove] = useRealtimeRefetch();

  onMount(() => subsribe(refetch));
  onCleanup(() => remove(refetch));

  return (
    <section>
      <Show when={previews() != undefined}>
        <Carousel itemWidth={500} buttonPosition='Botton'>
          <For each={previews()}>
            {(p) => (
              <PreviewTable
                communityName={p.community}
                rankings={p.preview}
                userName={context.name() || ""}
              />
            )}
          </For>
          <Show when={previews()!.length < 5}>
            <CreateCpommunityCard
              refetch={refetch}
              numberOfCommunities={previews()!.length}
            />
          </Show>
        </Carousel>
      </Show>
    </section>
  );
};

export default UserCommunitySection;
