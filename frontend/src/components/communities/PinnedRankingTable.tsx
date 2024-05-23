import { Component, For } from "solid-js";
import { UserRanking } from "../../utils/types/UserRanking";
import Table from "../shared/Table";
import RankingTableRow from "./RankingTableRow";

const PinnedRankingTable: Component<{
  rankings: UserRanking[];
  handlePinUser: (r: UserRanking) => void;
}> = (props) => {
  return (
    <Table headings={["Rank", "User", "Points", ""]} style='w-[600px]'>
      <For each={props.rankings}>
        {(ranking) => (
          <RankingTableRow
            ranking={ranking}
            handlePinUser={props.handlePinUser}
          />
        )}
      </For>
    </Table>
  );
};

export default PinnedRankingTable;
