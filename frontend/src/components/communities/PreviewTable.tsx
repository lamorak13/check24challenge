import { Component, For } from "solid-js";
import { UserRanking } from "../../utils/types/UserRanking";
import {
  RiArrowsArrowDropLeftLine,
  RiArrowsArrowDropRightLine,
} from "solid-icons/ri";
import Table from "../shared/Table";
import { A } from "@solidjs/router";

const PreviewTable: Component<{
  communityName: string;
  rankings: UserRanking[];
  userName: string;
}> = (props) => {
  return (
    <div>
      <div class='flex justify-between mb-3'>
        <h3>{props.communityName}</h3>
        <A href={`/communities/${props.communityName}`} class='no-underline'>
          <span>Show more</span>
          <RiArrowsArrowDropRightLine class='inline-block' size={30} />
        </A>
      </div>

      <Table
        headings={["Rank", "User", "Points"]}
        style='w-[400px] border-none flex-shrink-0 snap-center'>
        <For each={props.rankings}>
          {(ranking) => (
            <tr
              class={`border-b border-silver/10 ${
                ranking.name == props.userName && "bg-light-blue/40"
              }`}>
              <td class='pl-4 py-2 text-silver'>{ranking.rank}</td>
              <td class='pl-4 py-2 text-silver'>{ranking.name}</td>
              <td class='pl-4 py-2 text-silver'>{ranking.points}</td>
            </tr>
          )}
        </For>
      </Table>
    </div>
  );
};

export default PreviewTable;
