import { Component, For, Show, createSignal } from "solid-js";
import { UserRanking } from "../../utils/types/UserRanking";
import { IoChevronDownOutline, IoChevronUpOutline } from "solid-icons/io";

const Communities: Component = () => {
  const rankings: UserRanking[] = [
    { username: "JohnDoe", rank: 1, points: 1000 },
    { username: "JaneDoe", rank: 2, points: 900 },
    { username: "AliceSmith", rank: 3, points: 800 },
    { username: "BobJohnson", rank: 4, points: 700 },
    { username: "EmilyBrown", rank: 5, points: 600 },
    { username: "MichaelWilson", rank: 6, points: 550 },
    { username: "SophiaMartinez", rank: 7, points: 500 },
    { username: "WilliamAnderson", rank: 8, points: 450 },
    { username: "OliviaTaylor", rank: 9, points: 400 },
    { username: "JamesThomas", rank: 10, points: 350 },
    { username: "IsabellaHernandez", rank: 11, points: 300 },
    { username: "AlexanderMoore", rank: 12, points: 250 },
    { username: "EvelynMartin", rank: 13, points: 200 },
    { username: "DanielJackson", rank: 14, points: 150 },
    { username: "AvaThompson", rank: 15, points: 100 },
    { username: "MasonWhite", rank: 16, points: 90 },
    { username: "MiaLopez", rank: 17, points: 80 },
    { username: "EthanLee", rank: 18, points: 70 },
    { username: "CamilaGonzalez", rank: 19, points: 60 },
    { username: "LiamHarris", rank: 20, points: 50 },
  ];
  const userRank = 11;
  const [pageSize, setPageSize] = createSignal(10);
  const [upperLimit, setUpperLimit] = createSignal(3);
  const [lowerLimit, setLowerLImit] = createSignal(userRank);

  return (
    <section class='py-10 overflow-auto grid justify-center'>
      <table class='w-[700px] custom-gradient rounded-sm'>
        <thead class='text-left bg-black uppercase tracking-widest text-silver'>
          <tr>
            <th class='px-4 py-3 font-semibold'>Rank</th>
            <th class='font-semibold'>User</th>
            <th class='font-semibold'>Points</th>
          </tr>
        </thead>
        <tbody class=''>
          <For each={rankings.slice(0, upperLimit())}>
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
                  setUpperLimit((l) =>
                    Math.min(l + pageSize(), lowerLimit() - 1)
                  )
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
                  setLowerLImit((l) =>
                    Math.max(l - pageSize(), upperLimit() + 1)
                  )
                }>
                Show more
                <IoChevronUpOutline class='inline-block ml-2 text-xl' />
              </td>
            </tr>
          </Show>

          <For each={rankings.slice(lowerLimit() - 1)}>
            {(ranking) => (
              <tr class='border-b border-silver/10'>
                <td class='pl-4 py-4 text-silver'>{ranking.rank}</td>
                <td>{ranking.username}</td>
                <td>{ranking.points}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </section>
  );
};

export default Communities;
