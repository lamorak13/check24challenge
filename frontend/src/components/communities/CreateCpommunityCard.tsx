import { Component, createSignal } from "solid-js";
import Button from "../form/Button";
import HorizontalLine from "../shared/HorizontalLine";
import CreateCommunityModal from "./CreateCommunityModal";
import JoinCommunityModal from "./JoinCommunityModal";

const CreateCpommunityCard: Component<{
  refetch: () => any;
  numberOfCommunities: number;
}> = (props) => {
  const [showCreatePopup, setShowCreatePopup] = createSignal(false);
  const [showJoinModal, setShowJoinModal] = createSignal(false);

  return (
    <div class=''>
      <h3 class='mb-8'>Get together with your friends!</h3>
      <div class='rounded-base border-2 border-silver/15 px-5 py-8 w-[400px] flex-shrink-0 snap-center'>
        <h3 class='text-silver text-center mb-6'>
          You have used {props.numberOfCommunities}/5 Communities
        </h3>
        <HorizontalLine />
        <div class='flex flex-col gap-5'>
          <p class='text-silver'>
            Create or join a community with all your friends!
          </p>
          <Button
            text='Join community'
            onClick={() => setShowJoinModal(true)}
          />
          <Button
            text='Create community'
            type='Secondary'
            onClick={() => setShowCreatePopup(true)}
          />
          <JoinCommunityModal
            show={showJoinModal}
            setShow={setShowJoinModal}
            onSubmit={props.refetch}
          />
          <CreateCommunityModal
            show={showCreatePopup}
            setShow={setShowCreatePopup}
            onSubmit={props.refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCpommunityCard;
