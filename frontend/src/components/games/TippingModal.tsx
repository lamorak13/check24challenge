import { Accessor, Component, Setter } from "solid-js";
import Modal from "../shared/Modal";
import Button from "../form/Button";
import Card from "./Card";
import { Game } from "../../utils/types/Game";

const TippingModal: Component<{
  show: Accessor<boolean>;
  setShow: Setter<boolean>;
  game: Game;
}> = (props) => {
  return (
    <Modal show={props.show} setShow={props.setShow}>
      <form method='dialog' class='flex flex-col gap-2 '>
        <Card game={props.game} />
        <Button text='Save' />
        <Button text='Cancel' />
      </form>
    </Modal>
  );
};

export default TippingModal;
