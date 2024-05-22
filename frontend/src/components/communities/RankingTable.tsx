import { Component, For, Show, createSignal } from "solid-js";
import { UserRanking } from "../../utils/types/UserRanking";
import Table from "../shared/Table";
import { IoChevronDownOutline, IoChevronUpOutline } from "solid-icons/io";
import { RiMapMapPin4Line } from "solid-icons/ri";
import { useUserNameContext } from "../../routes/UserNameContext";

const RankingTable: Component<{
  rankings: UserRanking[];
  handlePinUser: (r: UserRanking) => void;
}> = (props) => {
  const { name } = useUserNameContext();
  const userRank = props.rankings.findIndex((r) => r.name == name());
  const [pageSize, setPageSize] = createSignal(5);
  const [upperLimit, setUpperLimit] = createSignal(3);
  const [lowerLimit, setLowerLImit] = createSignal(userRank);

  return (
    <Table headings={["Rank", "User", "Points", ""]} style='w-[600px]'>
      <For each={props.rankings.slice(0, upperLimit())}>
        {(ranking) => (
          <tr class='border-b border-silver/10'>
            <td class='pl-4 py-4 text-silver'>{ranking.rank}</td>
            <td class='pl-4 py-4'>{ranking.name}</td>
            <td class='pl-4 py-4'>{ranking.points}</td>
            <td class='pl-4 py-4'>
              <button onClick={() => props.handlePinUser(ranking)}>
                <RiMapMapPin4Line
                  size={20}
                  class={`${
                    ranking.pinned ? "text-light-blue" : "text-dark-gray"
                  }  hover:text-light-blue cursor-pointer`}
                />
              </button>
            </td>
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
            <td class='pl-4 py-4'>{ranking.name}</td>
            <td class='pl-4 py-4'>{ranking.points}</td>
            <td class='pl-4 py-4'>
              <button onClick={() => props.handlePinUser(ranking)}>
                <RiMapMapPin4Line
                  size={20}
                  class={`${
                    ranking.pinned ? "text-light-blue" : "text-dark-gray"
                  }  hover:text-light-blue cursor-pointer`}
                />
              </button>
            </td>
          </tr>
        )}
      </For>
    </Table>
  );
};

export default RankingTable;
