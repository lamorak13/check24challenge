import { Component, For } from "solid-js";
import { UserRanking } from "../../utils/types/UserRanking";
import {
  RiArrowsArrowDropLeftLine,
  RiArrowsArrowDropRightLine,
} from "solid-icons/ri";
import Table from "../shared/Table";
import { A } from "@solidjs/router";

const PreviewTable: Component<{ communityName: string }> = (props) => {
  const rankings: UserRanking[] = [
    { id: "1", username: "JohnDoe", rank: 1, points: 1000, pinned: false },
    { id: "10", username: "JaneDoe", rank: 2, points: 900, pinned: false },
    { id: "11", username: "AliceSmith", rank: 3, points: 800, pinned: false },
    { id: "12", username: "MasonWhite", rank: 16, points: 90, pinned: false },
    { id: "13", username: "MiaLopez", rank: 17, points: 80, pinned: false },
    { id: "14", username: "EthanLee", rank: 18, points: 70, pinned: false },
    { id: "15", username: "LiamHarris", rank: 20, points: 50, pinned: false },
  ];
  const userRank = 17;

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
        <For each={rankings}>
          {(ranking) => (
            <tr
              class={`border-b border-silver/10 ${
                ranking.rank == userRank && "bg-light-blue/40"
              }`}>
              <td class='pl-4 py-2 text-silver'>{ranking.rank}</td>
              <td class='pl-4 py-2 text-silver'>{ranking.username}</td>
              <td class='pl-4 py-2 text-silver'>{ranking.points}</td>
            </tr>
          )}
        </For>
      </Table>
    </div>
  );
};

export default PreviewTable;
