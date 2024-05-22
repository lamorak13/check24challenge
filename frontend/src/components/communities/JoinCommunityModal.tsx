import { Accessor, Component, Setter, createSignal } from "solid-js";
import Input from "../form/Input";
import Button from "../form/Button";
import HorizontalLine from "../shared/HorizontalLine";
import Modal from "../shared/Modal";
import { useUserNameContext } from "../../routes/UserNameContext";
import { joinCommunity } from "../../utils/api";

const JoinCommunityModal: Component<{
  show: Accessor<boolean>;
  setShow: Setter<boolean>;
  onSubmit: () => any;
}> = (props) => {
  const context = useUserNameContext();
  const [groupName, setGroupName] = createSignal("");

  return (
    <Modal
      show={props.show}
      setShow={props.setShow}
      onClose={() => setGroupName("")}>
      <form method='dialog' class='flex flex-col gap-2'>
        <h1 class='text-center'>Join your friends!</h1>
        <HorizontalLine />
        <Input
          placeholder='Enter code'
          value={groupName()}
          onInput={setGroupName}
        />
        <Button
          text='Join now'
          onClick={async () => {
            await joinCommunity(context.name() || "", groupName());
            props.onSubmit();
          }}
        />
      </form>
    </Modal>
  );
};

export default JoinCommunityModal;
