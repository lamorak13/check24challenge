import { Accessor, Component, Setter, createSignal } from "solid-js";
import Input from "../form/Input";
import Button from "../form/Button";
import HorizontalLine from "../shared/HorizontalLine";
import Modal from "../shared/Modal";

const CreateCommunityModal: Component<{
  show: Accessor<boolean>;
  setShow: Setter<boolean>;
}> = (props) => {
  const [groupName, setGroupName] = createSignal("");

  return (
    <Modal show={props.show} setShow={props.setShow}>
      <form method='dialog' class='flex flex-col gap-2 '>
        <h1 class='text-center'>Create new group</h1>
        <HorizontalLine />
        <Input
          placeholder='Group name'
          value={groupName()}
          onInput={setGroupName}
        />
        <Button text='Create group' />
      </form>
    </Modal>
  );
};

export default CreateCommunityModal;
