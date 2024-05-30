import { Component, Show, createResource, onCleanup, onMount } from "solid-js";
import { useUserContext } from "../UserNameContext";
import { UserRanking } from "../../utils/types/UserRanking";
import { useRealtimeRefetch } from "../../utils/useRealtimeRefetch";
import { fetchCommunityPreview } from "../../utils/api/rankings";
import PreviewTable from "../../components/communities/PreviewTable";
import { ServerMessage } from "../../utils/types/ServerMessage";

const OverallCommunityPreview: Component<{}> = () => {
  const { user } = useUserContext();
  const [preview, { refetch }] = createResource<UserRanking[]>(() =>
    fetchCommunityPreview(user().name, "Overall")
  );

  const [subsribe, unsubscribe] = useRealtimeRefetch();
  onMount(() => subsribe(refetch, [ServerMessage["Game Finished"]]));
  onCleanup(() => unsubscribe(refetch, [ServerMessage["Game Finished"]]));

  return (
    <Show when={preview() != undefined}>
      <PreviewTable
        communityName={"Overall"}
        rankings={preview()!}
        userName={user().name}
      />
    </Show>
  );
};

export default OverallCommunityPreview;
