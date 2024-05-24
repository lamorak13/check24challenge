import { Component, Show, createResource, onCleanup, onMount } from "solid-js";
import { useUserNameContext } from "../UserNameContext";
import { UserRanking } from "../../utils/types/UserRanking";
import { useRealtimeRefetch } from "../../utils/useRealtimeRefetch";
import { fetchCommunityPreview } from "../../utils/api";
import PreviewTable from "../../components/communities/PreviewTable";

const OverallCommunityPreview: Component<{}> = () => {
  const { name } = useUserNameContext();
  const [preview, { refetch }] = createResource<UserRanking[]>(() =>
    fetchCommunityPreview(name(), "Overall")
  );

  const [subsribe, remove] = useRealtimeRefetch();
  onMount(() => subsribe(refetch));
  onCleanup(() => remove(refetch));

  return (
    <Show when={preview() != undefined}>
      <PreviewTable
        communityName={"Overall"}
        rankings={preview()!}
        userName={name()}
      />
    </Show>
  );
};

export default OverallCommunityPreview;
