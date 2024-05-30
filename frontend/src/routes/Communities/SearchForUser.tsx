import {
  Component,
  Show,
  createResource,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import SimpleRankingTable from "../../components/communities/SimpleRankingTable";
import { UserRanking } from "../../utils/types/UserRanking";
import { fetchCommunitySearchForUser } from "../../utils/api/rankings";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { ServerMessage } from "../../utils/types/ServerMessage";
import { useRealtimeRefetch } from "../../utils/useRealtimeRefetch";

const SearchForUser: Component<{
  handlePinUser: (ranking: UserRanking) => void;
  communityName: string;
}> = (props) => {
  const [input, setInput] = createSignal("");
  const [query, setQuery] = createSignal<string | null>(null);
  const [foundRankings, { refetch }] = createResource(query, (query: string) =>
    fetchCommunitySearchForUser(query, props.communityName)
  );

  const [subsribe, unsubscribe] = useRealtimeRefetch();
  onMount(() => subsribe(refetch, [ServerMessage["Game Finished"]]));
  onCleanup(() => unsubscribe(refetch, [ServerMessage["Game Finished"]]));

  return (
    <div class='mb-10'>
      <div class='flex gap-5 mb-5'>
        <Input
          value={input()}
          onInput={setInput}
          placeholder='Search User'
          style='flex-grow'
        />
        <Button text='Search' onClick={() => setQuery(input())} />
      </div>
      <Show when={foundRankings() != undefined}>
        <SimpleRankingTable
          rankings={foundRankings()!}
          handlePinUser={props.handlePinUser}
        />
      </Show>
    </div>
  );
};

export default SearchForUser;
