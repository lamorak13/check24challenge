import { Component, For } from "solid-js";
import { UserRanking } from "../../utils/types/UserRanking";
import Table from "../shared/Table";

const PreviewTable: Component<{}> = () => {
  const rankings: UserRanking[] = [
    { username: "JohnDoe", rank: 1, points: 1000 },
    { username: "JaneDoe", rank: 2, points: 900 },
    { username: "AliceSmith", rank: 3, points: 800 },
    { username: "MasonWhite", rank: 16, points: 90 },
    { username: "MiaLopez", rank: 17, points: 80 },
    { username: "EthanLee", rank: 18, points: 70 },
    { username: "LiamHarris", rank: 20, points: 50 },
  ];
  const userRank = 17;

  return (
    <Table
      headings={["Rank", "User", "Points"]}
      style='w-[400px] border-none flex-shrink-0 snap-center'>
      <For each={rankings}>
        {(ranking) => (
          <tr
            class={`border-b border-silver/10 ${
              ranking.rank == userRank && "bg-light-blue/40"
            }`}>
            <td class='pl-4 py-4 text-silver'>{ranking.rank}</td>
            <td>{ranking.username}</td>
            <td>{ranking.points}</td>
          </tr>
        )}
      </For>
    </Table>
  );
};

export default PreviewTable;
