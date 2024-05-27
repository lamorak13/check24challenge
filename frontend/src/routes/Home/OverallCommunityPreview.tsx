import { Component, Show, createResource, onCleanup, onMount } from "solid-js";
import { useUserNameContext } from "../UserNameContext";
import { UserRanking } from "../../utils/types/UserRanking";
import { useRealtimeRefetch } from "../../utils/useRealtimeRefetch";
import { fetchCommunityPreview } from "../../utils/api/rankings";
import PreviewTable from "../../components/communities/PreviewTable";
import { ServerMessage } from "../../utils/types/ServerMessage";

const OverallCommunityPreview: Component<{}> = () => {
  const { name } = useUserNameContext();
  const [preview, { refetch }] = createResource<UserRanking[]>(() =>
    fetchCommunityPreview(name(), "Overall")
  );

  const [subsribe, unsubscribe] = useRealtimeRefetch();
  onMount(() => subsribe(refetch, [ServerMessage["Game Finished"]]));
  onCleanup(() => unsubscribe(refetch, [ServerMessage["Game Finished"]]));

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
