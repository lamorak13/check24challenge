import { A } from "@solidjs/router";
import { type Component } from "solid-js";
import CreateGroupModal from "../components/groups/CreateGroupModal";
import JoinGroupModal from "../components/groups/JoinGroupModal";

const Home: Component = () => {
  return (
    <>
      <A href='/signin'>Sign in</A>
      <A href='/games'>Games</A>
      <A href='/communities'>Communities</A>
      <CreateGroupModal />
      <JoinGroupModal />
    </>
  );
};

export default Home;
