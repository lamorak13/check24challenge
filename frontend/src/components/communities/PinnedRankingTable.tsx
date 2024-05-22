import { Component, For } from "solid-js";
import { UserRanking } from "../../utils/types/UserRanking";
import Table from "../shared/Table";
import { RiMapMapPin4Line } from "solid-icons/ri";

const PinnedRankingTable: Component<{
  rankings: UserRanking[];
}> = (props) => {
  return (
    <Table headings={["Rank", "User", "Points", ""]} style='w-[600px]'>
      <For each={props.rankings.filter((r) => r.pinned)}>
        {(ranking) => (
          <tr class='border-b border-silver/10'>
            <td class='pl-4 py-4 text-silver'>{ranking.rank}</td>
            <td class='pl-4 py-4'>{ranking.name}</td>
            <td class='pl-4 py-4'>{ranking.points}</td>
            <td class='pl-4 py-4'>
              <RiMapMapPin4Line
                size={20}
                class='text-dark-gray hover:text-light-blue cursor-pointer'
              />
            </td>
          </tr>
        )}
      </For>
    </Table>
  );
};

export default PinnedRankingTable;
