import {
  Accessor,
  Component,
  Setter,
  createEffect,
  createSignal,
} from "solid-js";
import { Game } from "../../utils/types/Game";
import Modal from "../shared/Modal";
import Card from "./Card";
import Button from "../form/Button";
import HorizontalLine from "../shared/HorizontalLine";
import Nation from "./Nation";
import { Score } from "../../utils/types/Score";
import ScoreInput from "../form/ScoreInput";
import { createStore } from "solid-js/store";

const BettingModal: Component<{
  game: Game;
  show: Accessor<boolean>;
  setShow: Setter<boolean>;
}> = (props) => {
  const [bet, setBet] = createStore<Score>({ home: 0, away: 0 });

  createEffect(() => console.log(bet.home));

  return (
    <Modal show={props.show} setShow={props.setShow}>
      <form method='dialog' class='flex flex-col gap-2 '>
        <h1 class='text-center'>Make a bet!</h1>
        <HorizontalLine />
        <div class='flex gap-10 mb-10 mx-auto'>
          <Nation nation={props.game.home} />
          <span class='text-4xl font-semibold flex gap-5 items-center'>
            <ScoreInput
              onInput={(n) => setBet("home", !Number.isNaN(n) ? n : 0)}
              value={bet.home!}
            />
            :
            <ScoreInput onInput={(n) => setBet("away", n)} value={bet.away!} />
          </span>
          <Nation nation={props.game.away} />
        </div>
        <Button text='Save' onClick={() => {}} />
        <Button text='Cancel' type='Secondary' onClick={() => {}} />
      </form>
    </Modal>
  );
};

export default BettingModal;
