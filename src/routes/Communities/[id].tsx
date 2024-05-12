import { Component, createSignal } from "solid-js";
import { UserRanking } from "../../utils/types/UserRanking";
import RankingTable from "../../components/communities/RankingTable";
import PinnedRankingTable from "../../components/communities/PinnedRankingTable";
import { createStore } from "solid-js/store";

const Community: Component = () => {
  const [rankings, setRankings] = createStore<UserRanking[]>([
    { id: "1", username: "JohnDoe", rank: 1, points: 1000, pinned: false },
    { id: "12", username: "JaneDoe", rank: 2, points: 900, pinned: false },
    { id: "13", username: "AliceSmith", rank: 3, points: 800, pinned: false },
    { id: "14", username: "BobJohnson", rank: 4, points: 700, pinned: false },
    { id: "15", username: "EmilyBrown", rank: 5, points: 600, pinned: false },
    {
      id: "16",
      username: "MichaelWilson",
      rank: 6,
      points: 550,
      pinned: false,
    },
    {
      id: "17",
      username: "SophiaMartinez",
      rank: 7,
      points: 500,
      pinned: false,
    },
    {
      id: "18",
      username: "WilliamAnderson",
      rank: 8,
      points: 450,
      pinned: false,
    },
    { id: "19", username: "OliviaTaylor", rank: 9, points: 400, pinned: false },
    { id: "10", username: "JamesThomas", rank: 10, points: 350, pinned: false },
    {
      id: "11",
      username: "IsabellaHernandez",
      rank: 11,
      points: 300,
      pinned: false,
    },
    {
      id: "20",
      username: "AlexanderMoore",
      rank: 12,
      points: 250,
      pinned: false,
    },
    {
      id: "21",
      username: "EvelynMartin",
      rank: 13,
      points: 200,
      pinned: false,
    },
    {
      id: "22",
      username: "DanielJackson",
      rank: 14,
      points: 150,
      pinned: false,
    },
    { id: "23", username: "AvaThompson", rank: 15, points: 100, pinned: false },
    { id: "24", username: "MasonWhite", rank: 16, points: 90, pinned: false },
    { id: "25", username: "MiaLopez", rank: 17, points: 80, pinned: false },
    { id: "26", username: "EthanLee", rank: 18, points: 70, pinned: false },
    {
      id: "27",
      username: "CamilaGonzalez",
      rank: 19,
      points: 60,
      pinned: false,
    },
    { id: "28", username: "LiamHarris", rank: 20, points: 50, pinned: false },
  ]);
  const [pinnedRankings, setPinnedRankings] = createSignal<UserRanking[]>([]);
  const userRank = 11;

  return (
    <section>
      <h3 class='mb-5'>Pinned Users</h3>
      <PinnedRankingTable rankings={pinnedRankings()} />
      <h3 class='mb-5 mt-20'>All Users</h3>
      <RankingTable rankings={rankings} userRank={userRank} />
    </section>
  );
};

export default Community;
