import { Component, For } from "solid-js";
import { Game } from "../../utils/types/Game";
import Pill from "../shared/Pill";
import getFlagEmoji from "../../utils/types/getFlagEmoji";
import Table from "../shared/Table";

const GameTable: Component<{ games: Game[] }> = (props) => {
  return (
    <Table headings={["Stadium", "Home", "", "Away", "Status"]}>
      <For each={props.games}>
        {(game) => (
          <tr class='border-b border-silver/10'>
            <td class='text-silver pl-4 py-4'>{game.arena}</td>
            <td class='uppercase font-semibold text-lg tracking-wider'>
              {getFlagEmoji(game.home.team, "text-2xl mr-2")}
              {game.home.team}
            </td>
            <td class='px-3 text-xl font-semibold'>
              {game.away.score} : {game.away.score}
            </td>
            <td class='uppercase font-semibold text-lg tracking-wider'>
              {game.away.team}
              {getFlagEmoji(game.away.team, "text-2xl ml-2")}
            </td>
            <td>
              <Pill status={game.status} />
            </td>
          </tr>
        )}
      </For>
    </Table>
  );
};

export default GameTable;
