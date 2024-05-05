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

  createEffect(() => console.log(groupName()));

  return (
    <>
      <button onClick={() => setShowPopup(true)}>Create a new group</button>
      <Modal show={showPopup} setShow={setShowPopup}>
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
    </>
  );
};

export default CreateGroupModal;
