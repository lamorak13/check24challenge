import { Component, createEffect, createSignal } from "solid-js";
import Input from "../form/Input";
import Button from "../form/Button";
import HorizontalLine from "../shared/HorizontalLine";
import Modal from "../shared/Modal";

const CreateGroupModal: Component<{}> = () => {
  const [showPopup, setShowPopup] = createSignal(true);
  const [groupName, setGroupName] = createSignal("");
  let modal: HTMLDialogElement | undefined;

  createEffect(() => {
    if (modal && showPopup()) modal.showModal();
  });

  return (
    <>
      <button onClick={() => setShowPopup(true)}>Join a new group</button>
      <Modal show={showPopup} setShow={setShowPopup}>
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
    </>
  );
};

export default CreateGroupModal;
