import { Accessor, Component, Setter, createEffect } from "solid-js";
import { Game } from "../../utils/types/Game";
import Modal from "../shared/Modal";
import Card from "./Card";
import Button from "../form/Button";
import HorizontalLine from "../shared/HorizontalLine";
import Nation from "./Nation";
import { Score } from "../../utils/types/Score";
import ScoreInput from "../form/ScoreInput";
import { createStore } from "solid-js/store";
import { postUserBet } from "../../utils/api";
import { useUserNameContext } from "../../routes/UserNameContext";

const BettingModal: Component<{
  game: Game;
  show: Accessor<boolean>;
  setShow: Setter<boolean>;
}> = (props) => {
  const { name } = useUserNameContext();
  const [bet, setBet] = createStore<Score>({ home: 0, away: 0 });

  return (
    <Modal
      show={props.show}
      setShow={props.setShow}
      onClose={() => setBet({ home: 0, away: 0 })}>
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
        <Button
          text='Save'
          onClick={async () => postUserBet(props.game.id, bet, name()!)}
        />
        <Button text='Cancel' type='Secondary' />
      </form>
    </Modal>
  );
};

export default BettingModal;
