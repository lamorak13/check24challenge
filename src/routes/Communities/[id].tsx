import { Component } from "solid-js";
import { UserRanking } from "../../utils/types/UserRanking";
import RankingTable from "../../components/communities/RankingTable";

const Community: Component = () => {
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

  return (
    <section class='overflow-auto'>
      <RankingTable rankings={rankings} userRank={userRank} />
    </section>
  );
};

export default Community;
