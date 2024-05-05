import { A } from "@solidjs/router";
import { type Component } from "solid-js";
import UpcomingGamesSection from "./UpcomingGamesSection";
import UserCommunitySection from "./UserCommunitySection";

const Home: Component = () => {
  return (
    <div class='flex justify-between gap-5'>
      <UpcomingGamesSection />
      <UserCommunitySection />
    </div>
  );
};

export default Home;
