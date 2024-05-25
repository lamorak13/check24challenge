import { Component, Show, createResource, createSignal } from "solid-js";
import SimpleRankingTable from "../../components/communities/SimpleRankingTable";
import { UserRanking } from "../../utils/types/UserRanking";
import { useUserNameContext } from "../UserNameContext";
import { fetchCommunitySearchForUser } from "../../utils/api/rankings";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";

const SearchForUser: Component<{
  handlePinUser: (ranking: UserRanking) => void;
  communityName: string;
}> = (props) => {
  const { name } = useUserNameContext();
  const [input, setInput] = createSignal("");
  const [query, setQuery] = createSignal<string | null>(null);
  const [foundRankings] = createResource(query, (query: string) =>
    fetchCommunitySearchForUser(query, props.communityName)
  );

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
