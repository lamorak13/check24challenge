import { Accessor, Component, Setter, createSignal } from "solid-js";
import Input from "../form/Input";
import Button from "../form/Button";
import HorizontalLine from "../shared/HorizontalLine";
import Modal from "../shared/Modal";

const JoinCommunityModal: Component<{
  show: Accessor<boolean>;
  setShow: Setter<boolean>;
}> = (props) => {
  const [groupName, setGroupName] = createSignal("");

  return (
    <Modal show={props.show} setShow={props.setShow}>
      <form method='dialog' class='flex flex-col gap-2'>
        <h1 class='text-center'>Join your friends!</h1>
        <HorizontalLine />
        <Input
          placeholder='Enter code'
          value={groupName()}
          onInput={setGroupName}
        />
        <Button text='Join now' />
      </form>
    </Modal>
  );
};

export default JoinCommunityModal;
