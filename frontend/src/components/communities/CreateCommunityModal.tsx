import { Accessor, Component, Setter, createSignal } from "solid-js";
import Input from "../form/Input";
import Button from "../form/Button";
import HorizontalLine from "../shared/HorizontalLine";
import Modal from "../shared/Modal";
import { createCommunity } from "../../utils/api/communities";
import { useUserNameContext } from "../../routes/UserNameContext";

const CreateCommunityModal: Component<{
  show: Accessor<boolean>;
  setShow: Setter<boolean>;
  onSubmit: () => any;
}> = (props) => {
  const { name } = useUserNameContext();
  const [groupName, setGroupName] = createSignal("");

  return (
    <Modal
      show={props.show}
      setShow={props.setShow}
      onClose={() => setGroupName("")}>
      <form method='dialog' class='flex flex-col gap-2 '>
        <h1 class='text-center'>Create new group</h1>
        <HorizontalLine />
        <Input
          placeholder='Group name'
          value={groupName()}
          onInput={setGroupName}
        />
        <Button
          text='Create group'
          onClick={async () => {
            await createCommunity(name(), groupName());
            props.onSubmit();
          }}
        />
      </form>
    </Modal>
  );
};

export default CreateCommunityModal;
