import { Component } from "solid-js";
import Carousel from "../../components/shared/Carousel";
import PreviewTable from "../../components/communities/PreviewTable";
import CreateCpommunityCard from "../../components/communities/CreateCpommunityCard";

const UserCommunitySection: Component<{}> = (props) => {
  return (
    <section>
      <Carousel itemWidth={500} buttonPosition='Botton'>
        <PreviewTable communityName='Abfahrt' />
        <PreviewTable communityName='TestCommunity' />
        <PreviewTable communityName='Hello World' />
        <CreateCpommunityCard />
      </Carousel>
    </section>
  );
};

export default UserCommunitySection;
