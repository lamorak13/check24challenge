import { RiMapMapPin4Line } from "solid-icons/ri";
import { Component } from "solid-js";
import { UserRanking } from "../../utils/types/UserRanking";
import DeltaDisplay from "./DeltaDisplay";

const RankingTableRow: Component<{
  ranking: UserRanking;
  userName: string;
  handlePinUser: (r: UserRanking) => void;
}> = (props) => {
  return (
    <tr
      class={`border-b border-silver/10 ${
        props.ranking.name == props.userName && "bg-light-blue/20"
      }`}>
      <td class='pl-4 py-4 text-silver'>{props.ranking.rank}</td>
      <td class='pl-4 py-4'>{props.ranking.name}</td>
      <td class='pl-4 py-4'>{props.ranking.points}</td>
      <td class='pl-4 py-4'>
        {props.ranking.bets == 0 ? "-" : props.ranking.bets}
      </td>
      <td class='pl-4 py-4'>
        {props.ranking.bets == 0 ? "-" : props.ranking.ppb.toFixed(2)}
      </td>
      <td class='pl-4 py-4'>
        <DeltaDisplay delta={props.ranking.delta} />
      </td>
      <td class='pl-4 py-4'>
        <button onClick={() => props.handlePinUser(props.ranking)}>
          <RiMapMapPin4Line
            size={20}
            class={`text-dark-gray hover:text-light-blue cursor-pointer`}
          />
        </button>
      </td>
    </tr>
  );
};

export default RankingTableRow;
