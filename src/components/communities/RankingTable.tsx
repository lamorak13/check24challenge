import { Component, For, Show, createSignal } from "solid-js";
import { UserRanking } from "../../utils/types/UserRanking";
import Table from "../shared/Table";
import { IoChevronDownOutline, IoChevronUpOutline } from "solid-icons/io";

const RankingTable: Component<{ rankings: UserRanking[]; userRank: number }> = (
  props
) => {
  const [pageSize, setPageSize] = createSignal(5);
  const [upperLimit, setUpperLimit] = createSignal(3);
  const [lowerLimit, setLowerLImit] = createSignal(props.userRank);

  return (
    <Table headings={["Rank", "User", "Points"]} style='w-[600px]'>
      <For each={props.rankings.slice(0, upperLimit())}>
        {(ranking) => (
          <tr class='border-b border-silver/10'>
            <td class='pl-4 py-4 text-silver'>{ranking.rank}</td>
            <td>{ranking.username}</td>
            <td>{ranking.points}</td>
          </tr>
        )}
      </For>
      <Show when={upperLimit() < lowerLimit() - 1}>
        <tr class='border-b border-silver/10'>
          <td
            colSpan={3}
            class='pl-4 py-4 text-center'
            onClick={() =>
              setUpperLimit((l) => Math.min(l + pageSize(), lowerLimit() - 1))
            }>
            Show more
            <IoChevronDownOutline class='inline-block ml-2 text-xl' />
          </td>
        </tr>

        <tr class='border-b border-silver/10'>
          <td
            colSpan={3}
            class='pl-4 py-4 text-center'
            onClick={() =>
              setLowerLImit((l) => Math.max(l - pageSize(), upperLimit() + 1))
            }>
            Show more
            <IoChevronUpOutline class='inline-block ml-2 text-xl' />
          </td>
        </tr>
      </Show>

      <For each={props.rankings.slice(lowerLimit() - 1)}>
        {(ranking) => (
          <tr class='border-b border-silver/10'>
            <td class='pl-4 py-4 text-silver'>{ranking.rank}</td>
            <td>{ranking.username}</td>
            <td>{ranking.points}</td>
          </tr>
        )}
      </For>
    </Table>
  );
};

export default RankingTable;
