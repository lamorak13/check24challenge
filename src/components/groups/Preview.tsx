import { Component, For } from "solid-js";
import { UserRanking } from "../../utils/types/UserRanking";

const Preview: Component<{}> = (props) => {
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
    <table class='w-[400px] custom-gradient border-none flex-shrink-0 snap-center'>
      <thead class='text-left bg-black uppercase tracking-widest text-silver'>
        <tr>
          <th class='px-4 py-3 font-semibold'>Rank</th>
          <th class='font-semibold'>User</th>
          <th class='font-semibold'>Points</th>
        </tr>
      </thead>
      <tbody class=''>
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
      </tbody>
    </table>
  );
};

export default Preview;
