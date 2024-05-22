import { Component, For, Show, createSignal } from "solid-js";
import { Game } from "../../utils/types/Game";
import Pill from "../shared/Pill";
import getFlagEmoji from "../../utils/getFlagEmoji";
import Table from "../shared/Table";
import { GameStatus } from "../../utils/types/GameStatus";
import ScoreDisplay from "./ScoreDisplay";
import DateDisplay from "./DateDisplay";
import BettingModal from "./BettingModal";

const UpcomingGamesTable: Component<{ games: Game[]; onSubmit: () => any }> = (
  props
) => {
  const [openBettingModal, setOpenBettingModal] = createSignal(false);
  const [currentGame, setCurrentGame] = createSignal(props.games[0]);

  return (
    <>
      <Table
        headings={["Kick-off", "Home", "Away", "Your bet"]}
        style='w-[600px] border-none'>
        <For each={props.games}>
          {(game) => (
            <tr
              class='border-b border-silver/10'
              onClick={() => {
                if (game.status == GameStatus.UPCOMING) {
                }
              }}>
              <td class='text-silver pl-4 py-4'>
                <DateDisplay date={game.kickoff} />
              </td>
              <td class='uppercase font-semibold text-lg tracking-wider pl-4 py-4'>
                <div class=' flex items-center'>
                  {getFlagEmoji(game.home, "text-2xl mr-2")}
                  {game.home}
                </div>
              </td>
              <td class='uppercase font-semibold text-lg tracking-wider pl-4 py-4 flex'>
                <div class=' flex items-center'>
                  {game.away}
                  {getFlagEmoji(game.away, "text-2xl ml-2")}
                </div>
              </td>
              <td class='pl-4 py-4'>
                <Show
                  when={!game.bet && game.status == GameStatus.UPCOMING}
                  fallback={<ScoreDisplay score={game.bet} />}>
                  <Pill
                    color='green'
                    text='Make a bet'
                    onClick={() => {
                      setCurrentGame(game);
                      setOpenBettingModal(true);
                    }}
                  />
                </Show>
              </td>
            </tr>
          )}
        </For>
      </Table>
      <BettingModal
        game={currentGame()}
        show={openBettingModal}
        setShow={setOpenBettingModal}
        onSubmit={props.onSubmit}
      />
    </>
  );
};

export default UpcomingGamesTable;
