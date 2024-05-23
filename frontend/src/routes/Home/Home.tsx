import { type Component } from "solid-js";
import UpcomingGamesSection from "./UpcomingGames";
import CommunityPreviews from "./CommunityPreviews";
import OverallCommunityPreview from "./OverallCommunityPreview";

const Home: Component = () => {
  return (
    <div class='flex justify-between gap-5'>
      <UpcomingGamesSection />
      <section class='flex flex-col gap-20 items-center'>
        <OverallCommunityPreview />
        <div>
          <CommunityPreviews />
        </div>
      </section>
    </div>
  );
};

export default Home;
