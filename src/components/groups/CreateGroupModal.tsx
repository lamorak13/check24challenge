import { Component, createEffect, createSignal } from "solid-js";
import Input from "../form/Input";
import Button from "../form/Button";
import HorizontalLine from "../shared/HorizontalLine";

const CreateGroupModal: Component<{}> = (props) => {
  const [showPopup, setShowPopup] = createSignal(true);
  const [groupName, setGroupName] = createSignal("");
  let modal: HTMLDialogElement | undefined;

  createEffect(() => {
    if (modal && showPopup()) modal.showModal();
  });

  return (
    <>
      <button onClick={() => setShowPopup(true)}>Create a new group</button>
      <dialog
        ref={modal}
        onClose={() => setShowPopup(false)}
        onClick={() => modal!.close()}
        class='bg-black text-white'>
        <form
          method='dialog'
          onClick={(e) => e.stopPropagation()}
          class='flex flex-col gap-2 py-16 px-12 min-w-[500px] custom-gradient'>
          <h1 class='text-center'>Create new group</h1>
          <HorizontalLine style='' />
          <Input
            placeholder='Group name'
            value={groupName()}
            onInput={setGroupName}
          />
          <Button text='Create group' />
        </form>
      </dialog>
    </>
  );
};

export default CreateGroupModal;
