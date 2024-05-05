import { Accessor, Component, JSX, Setter, createEffect } from "solid-js";

const Modal: Component<{
  show: Accessor<boolean>;
  setShow: Setter<boolean>;
  children?: JSX.Element;
}> = (props) => {
  let modal: HTMLDialogElement | undefined;

  createEffect(() => {
    if (modal && props.show()) modal.showModal();
  });

  return (
    <dialog
      ref={modal}
      onClose={() => props.setShow(false)}
      onClick={() => modal!.close()}
      class='bg-black text-white'>
      <div
        onClick={(e) => e.stopPropagation()}
        class='py-16 px-12 min-w-[500px] custom-gradient'>
        {props.children}
      </div>
    </dialog>
  );
};

export default Modal;
